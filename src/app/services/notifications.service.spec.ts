import { TestBed } from '@angular/core/testing'

import { FCM } from 'cordova-plugin-fcm-with-dependecy-updated/ionic/ngx'
import { Platform } from '@ionic/angular'
import { NotificationsService } from './notifications.service'
import { firebaseCloudMessagingStub } from '../../test-utils/stubs/firebaseCloudMessaging'
import { FirebaseService } from './firebase.service'
import { firebaseServiceStub } from '../../test-utils/stubs/firebaseService'

describe('NotificationsService', () => {
    let service: NotificationsService
    let fcm: FCM
    let firebase

    const platformStub: Partial<Platform> = {
        ready: () => Promise.resolve(''),
    }

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                {
                    provide: FCM,
                    useValue: firebaseCloudMessagingStub,
                },
                {
                    provide: FirebaseService,
                    useValue: firebaseServiceStub,
                },
                {
                    provide: Platform,
                    useValue: platformStub,
                },
            ],
        })
        service = TestBed.inject(NotificationsService)
        fcm = TestBed.inject(FCM)
        firebase = TestBed.inject(FirebaseService)
        jest.spyOn(service, 'setupForApp')
        jest.spyOn(service, 'setupForWeb')
        jest.spyOn(fcm, 'onTokenRefresh')
        jest.spyOn(fcm, 'onNotification')
        jest.spyOn(fcm, 'requestPushPermission')
        jest.spyOn(fcm, 'getToken')
        jest.spyOn(fcm, 'getInitialPushPayload')
        jest.spyOn(firebase, 'setNotificationToken')
    })

    it('should be created', () => {
        expect(service).toBeTruthy()
    })

    test.skip('should differentiate between cordova and web', async () => {
        await service.setup('12345678')
        expect(service.setupForWeb).toHaveBeenCalled()
        // @TODO change Platform provider to mock platform
        await service.setup('12345678')
        expect(service.setupForApp).toHaveBeenCalled()
    })

    it('should request for permission on cordova', async () => {
        await service.setupForApp('12345678')
        expect(fcm.requestPushPermission).toHaveBeenCalled()
    })

    it('should get a token and store it in the database on cordova', async () => {
        await service.setupForApp('12345678')
        expect(fcm.getToken).toHaveBeenCalled()
        expect(firebase.setNotificationToken).toHaveBeenCalledWith('12345678', 'test')
    })

    it('should get the initial payload on cordova', async () => {
        await service.setupForApp('12345678')
        expect(fcm.getInitialPushPayload).toHaveBeenCalled()
    })

    it('should subscribe to new notifications on cordova', async () => {
        await service.setupForApp('12345678')
        expect(fcm.onNotification).toHaveBeenCalled()
    })

    it('should refresh the token on cordova', async () => {
        await service.setupForApp('abcdefgh')
        expect(fcm.onTokenRefresh).toHaveBeenCalled()
        expect(firebase.setNotificationToken).toHaveBeenCalledWith('abcdefgh', 'test')
    })

    // the function requestToken(), which combines requestPushPermission() and tokenChanges() is currently not
    // available as a spy. That's an open bug in the angular repo. So we aren't able to test the follwoing cases
    /* eslint-disable @typescript-eslint/no-empty-function */
    test.skip('should get the token and refresh it in the web version', () => {})
    test.skip('should store the token in the database in the web version', () => {})
    /* eslint-enable */
})
