import { FCM } from 'cordova-plugin-fcm-with-dependecy-updated/ionic/ngx'
import { Observable } from 'rxjs'
import { INotificationPayload } from 'cordova-plugin-fcm-with-dependecy-updated'

export const firebaseCloudMessagingStub: Partial<FCM> = {
    onTokenRefresh: () => new Observable(),
    onNotification: () => new Observable(),
    getInitialPushPayload: () => Promise.resolve('' as unknown as INotificationPayload),
    requestPushPermission: () => Promise.resolve(true),
    getToken: () => Promise.resolve('test'),
}
