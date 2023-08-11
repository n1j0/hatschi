import { Injectable } from '@angular/core'
import { FCM } from 'cordova-plugin-fcm-with-dependecy-updated/ionic/ngx'
import { Platform } from '@ionic/angular'
import { INotificationPayload } from 'cordova-plugin-fcm-with-dependecy-updated'
import { FirebaseService } from './firebase.service'

@Injectable({
    providedIn: 'root',
})
export class NotificationsService {
    private token: string

    private pushPayload: INotificationPayload

    private hasPermission: boolean

    // eslint-disable-next-line no-useless-constructor
    constructor(
        private fcm: FCM,
        private platform: Platform,
        private firebase: FirebaseService,
    ) {
    }

    setup(myHatschiID: string): void {
        this.platform.ready()
            .then(async (platform) => {
                if (platform === 'cordova') {
                    await this.setupForApp(myHatschiID)
                } else {
                    this.setupForWeb(myHatschiID)
                }
            })
    }

    async setupForApp(hatschiID: string): Promise<void> {
        this.fcm.onTokenRefresh().subscribe(async (newToken) => {
            await this.firebase.deleteNotificationToken(hatschiID, this.token)
            this.token = newToken
            await this.firebase.setNotificationToken(hatschiID, this.token)
        })

        this.fcm.onNotification().subscribe((payload) => {
            this.pushPayload = payload
        })

        // @TODO when user denies permission it has to be granted manually in settings afterwards
        this.hasPermission = await this.fcm.requestPushPermission()

        this.token = await this.fcm.getToken()
        await this.firebase.setNotificationToken(hatschiID, this.token)

        this.pushPayload = await this.fcm.getInitialPushPayload()
    }

    setupForWeb(hatschiID: string): void {
        this.firebase.requestNotificationToken().subscribe(async (token) => {
            if (this.token) {
                await this.firebase.deleteNotificationToken(hatschiID, this.token)
            }
            this.token = token
            await this.firebase.setNotificationToken(hatschiID, this.token)
            this.firebase.getNotifications().subscribe((payload: INotificationPayload) => {
                this.pushPayload = payload
            })
        })
    }
}
