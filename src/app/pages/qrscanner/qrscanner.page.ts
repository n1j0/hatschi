import { Component } from '@angular/core'
import { AlertController, ToastController, ViewWillEnter, ViewWillLeave } from '@ionic/angular'
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx'
import { Router } from '@angular/router'
import { Subscription } from 'rxjs'
import { StorageService } from '../../services/storage.service'
import { CryptService } from '../../services/crypt.service'
import { ChatService } from '../../services/chat.service'
import { LoadingService } from '../../services/loading.service'
import { FirebaseService } from '../../services/firebase.service'

@Component({
    selector: 'app-qrscanner',
    templateUrl: './qrscanner.page.html',
    styleUrls: [ './qrscanner.page.scss' ],
})
export class QrscannerPage implements ViewWillEnter, ViewWillLeave {
    private scannerHub: Subscription

    // eslint-disable-next-line no-useless-constructor
    constructor(
        private alertController: AlertController,
        private crypt: CryptService,
        private router: Router,
        private scanner: QRScanner,
        private storage: StorageService,
        private chat: ChatService,
        private loading: LoadingService,
        private toast: ToastController,
        private firebase: FirebaseService,
    ) {
    }

    ionViewWillEnter(): void {
        this.scanner.prepare()
            .then((status: QRScannerStatus) => {
                if (status.authorized) {
                    const scanner = this.scanner.scan()
                    this.scanner.show()
                    window.document.querySelector('app-qrscanner > ion-content')?.classList.add('scanner-open')
                    this.scannerHub = scanner.subscribe((sessionID: string) => {
                        this.closeScanner()
                        this.createHatschiIdentity(sessionID)
                    })
                }

                if (status.denied && status.canOpenSettings) {
                    this.scanner.openSettings()
                }
            })
            .catch((error) => {
                console.error(`QRCodeScanner could not be opened. ${error}`)
            })
    }

    ionViewWillLeave(): void {
        this.closeScanner()
    }

    private closeScanner(): void {
        window.document.querySelector('app-qrscanner > ion-content')?.classList.remove('scanner-open')
        this.scannerHub?.unsubscribe()
        this.scanner?.destroy()
    }

    private createHatschiIdentity(sessionID: string): void {
        this.alertController.create({
            header: 'Set password (min. 6 chars)',
            subHeader: 'You need this password to use Hatschi in your browser',
            inputs: [
                {
                    name: 'passphrase',
                    type: 'text',
                    placeholder: 'Password',
                },
            ],
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: () => {
                        this.router.navigateByUrl('/')
                    },
                }, {
                    text: 'Save',
                    handler: async (data) => {
                        if (!data.passphrase || data.passphrase.length < 6) {
                            await this.router.navigateByUrl('/')
                            this.toast.create({
                                message: 'Password too weak. Use min. 6 chars',
                                keyboardClose: true,
                                position: 'middle',
                                duration: 2000,
                            })
                                .then(toast => toast.present())
                            return
                        }
                        await this.loading.startLoading('Encrypting data')
                        const getAccessTokenForWeb = this.firebase.callHttpsFunction('getAccessTokenForWeb')
                        await getAccessTokenForWeb({ uuid: await this.storage.getUuid() }).toPromise()
                            .then(async (accessToken) => {
                                const { identity, salt, iv } = await this.crypt.encryptHatschiIdentity(
                                    this.chat.chat.myHatschiID,
                                    await this.storage.getSecretKey(),
                                    accessToken,
                                    data.passphrase,
                                )
                                await this.firebase.getSessionIDReference(sessionID).set({
                                    identity,
                                    salt,
                                    iv,
                                })
                                this.firebase.signIn(accessToken).then((userCredentials) => {
                                    this.firebase.updateAuthUser(userCredentials.user)
                                    this.router.navigateByUrl('/')
                                })
                            })
                            .catch((error) => {
                                console.error(error)
                            })
                        await this.loading.stopLoading()
                    },
                },
            ],
        }).then(async (alert) => {
            await alert.present()
        })
    }
}
