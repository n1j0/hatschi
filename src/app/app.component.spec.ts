import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { TestBed, waitForAsync } from '@angular/core/testing'

import { SplashScreen } from '@ionic-native/splash-screen/ngx'
import { StatusBar } from '@ionic-native/status-bar/ngx'
import { Router } from '@angular/router'
import { FCM } from 'cordova-plugin-fcm-with-dependecy-updated/ionic/ngx'
import { QRCodeModule } from 'angularx-qrcode'
import { SecureStorageEcho } from '@ionic-native/secure-storage-echo/ngx'
import { IonicStorageModule } from '@ionic/storage'
import { AppComponent } from './app.component'
import { StatusBarMock } from '../test-utils/mocks/statusBar'
import { SplashScreenMock } from '../test-utils/mocks/splashScreen'
import { firebaseCloudMessagingStub } from '../test-utils/stubs/firebaseCloudMessaging'
import { FirebaseService } from './services/firebase.service'
import { firebaseServiceStub } from '../test-utils/stubs/firebaseService'

describe('AppComponent', () => {
    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [ AppComponent ],
            schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
            imports: [
                IonicStorageModule.forRoot(),
                QRCodeModule,
            ],
            providers: [
                {
                    provide: StatusBar,
                    useFactory: () => StatusBarMock,
                },
                {
                    provide: SplashScreen,
                    useFactory: () => SplashScreenMock,
                },
                {
                    provide: FirebaseService,
                    useValue: firebaseServiceStub,
                },
                { provide: Router },
                SecureStorageEcho,
                {
                    provide: FCM,
                    useValue: firebaseCloudMessagingStub,
                },
            ],
        }).compileComponents()
    }))

    it('should create the app', () => {
        const fixture = TestBed.createComponent(AppComponent)
        const app = fixture.debugElement.componentInstance
        expect(app).toBeTruthy()
    })
})
