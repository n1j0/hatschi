import { Component, NgZone, OnInit } from '@angular/core'
import { SplashScreen } from '@ionic-native/splash-screen/ngx'
import { StatusBar } from '@ionic-native/status-bar/ngx'
import { Router } from '@angular/router'
import { fromEvent, Observable, Subscription } from 'rxjs'
import { debounceTime, map, startWith } from 'rxjs/operators'
import { AlertController, Platform } from '@ionic/angular'
import { CryptService } from './services/crypt.service'
import { HATSCHI_ID_STORAGE_NAME, StorageService } from './services/storage.service'
import { ChatService } from './services/chat.service'
import { IframeCommunicationService } from './services/iframe-communication.service'
import { NotificationsService } from './services/notifications.service'
import { LoadingService } from './services/loading.service'
import { FirebaseService } from './services/firebase.service'

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: [ 'app.component.scss' ],
})
export class AppComponent implements OnInit {
    sessionID = ''

    secureHatschiObject = null

    passphrase = ''

    browserIsReady = false

    isScreenLarge$: Observable<boolean>

    invalidPassword = false

    screenSizeObserver: Subscription

    constructor(
        private platform: Platform,
        private router: Router,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        private crypt: CryptService,
        private chat: ChatService,
        private storage: StorageService,
        private alert: AlertController,
        private firebase: FirebaseService,
        private iframeCommunication: IframeCommunicationService,
        private notifications: NotificationsService,
        private zone: NgZone,
        private loading: LoadingService,
    ) {
        this.initializeApp()
    }

    // eslint-disable-next-line class-methods-use-this
    private isDesktopScreen = (): boolean => window.innerWidth >= 992

    ngOnInit(): void {
        const screenSizeChanged$ = fromEvent(window, 'resize').pipe(debounceTime(500)).pipe(map(this.isDesktopScreen))
        this.isScreenLarge$ = screenSizeChanged$.pipe(startWith(this.isDesktopScreen()))
        this.screenSizeObserver = screenSizeChanged$.subscribe(async () => {
            if (!this.browserIsReady && this.isDesktopScreen()) {
                await this.setUpBrowser()
                this.screenSizeObserver.unsubscribe()
            }
        })
    }

    initializeApp(): void {
        this.platform.ready().then(async () => {
            if (this.isApp()) {
                this.statusBar.styleDefault()
                await this.setUpApp()
                this.splashScreen.hide()
            } else if (this.isDesktopScreen()) {
                if ('serviceWorker' in navigator) {
                    window.addEventListener('load', () => {
                        navigator.serviceWorker.register('/firebase-messaging-sw.js')
                    })
                }
                await this.setUpBrowser()
            }
        })
    }

    isApp(): boolean {
        return this.platform.is('cordova')
    }

    private async setUpApp() {
        const myHatschiID = await this.storage.getHatschiID()
        // use this to access current user in the app
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        await this.firebase.onAuthStateChanged()
        if (myHatschiID) {
            this.notifications.setup(myHatschiID)
            this.chat.chat.myHatschiID = myHatschiID
            return
        }

        await this.loading.startLoading('Setting up')

        const generateHatschiIDAndAccessToken = this.firebase.callHttpsFunction('generateHatschiIDAndAccessToken')
        const keys = this.crypt.generateKeyPair()
        let hatschiID = ''

        await generateHatschiIDAndAccessToken({ publicKey: keys.publicKey }).toPromise()
            .then(async (result) => {
                hatschiID = result.hatschiID
                await this.firebase.signIn(result.accessToken)
                this.chat.chat.myHatschiID = hatschiID

                return this.storage.setStoreData({
                    hatschiID,
                    uuid: result.uuid,
                    secretKey: keys.secretKey,
                })
            })
            .catch((error) => {
                this.alert.create({
                    header: 'Please restart the app',
                    message: `There was an error during start up. Couldn't create Hatschi ID. ${error}`,
                    keyboardClose: true,
                    backdropDismiss: false,
                })
                    .then(toast => toast.present())
            })

        await this.loading.stopLoading()
        this.notifications.setup(hatschiID)
    }

    private setUpBrowser(): Promise<void> {
        if (this.sessionID) {
            return
        }

        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/firebase-messaging-sw.js')
        }

        const randomValues = window.crypto.getRandomValues(new Uint8Array(256 / 2))
        this.sessionID = Array.from(randomValues, i => i.toString(36).padStart(2, '0')).join('')

        const sessionRef = this.firebase.getSessionIDReference(this.sessionID)
        sessionRef.set(true).then(() => {
            sessionRef.on('value', (snapshot) => {
                const data = snapshot.val()
                if (data && typeof data === 'object') {
                    this.zone.run(() => {
                        this.secureHatschiObject = { ...data }
                    })
                    sessionRef.remove().then(() => {
                        sessionRef.off()
                    })
                    this.screenSizeObserver.unsubscribe()
                }
            })
        })
    }

    async decryptIdentity(): Promise<void> {
        this.invalidPassword = false
        try {
            const decrypted = await this.crypt.decryptHatschiIdentity(
                this.secureHatschiObject.identity,
                this.secureHatschiObject.salt,
                this.secureHatschiObject.iv,
                this.passphrase,
            )
            await this.firebase.setAuthPersistence('session')
            await this.firebase.signIn(decrypted.accessToken)

            const { myHatschiID } = decrypted
            this.notifications.setup(myHatschiID)
            sessionStorage.setItem(HATSCHI_ID_STORAGE_NAME, myHatschiID)
            this.chat.chat.myHatschiID = myHatschiID
            await this.iframeCommunication.performOperation(decrypted.mySecretKey)
            this.browserIsReady = true
            await this.router.navigateByUrl('/web-app')
        } catch {
            this.invalidPassword = true
        }
    }
}
