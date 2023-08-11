import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing'
import { IonicModule } from '@ionic/angular'

import { QRScanner } from '@ionic-native/qr-scanner/ngx'
import { Router } from '@angular/router'
import { SecureStorageEcho } from '@ionic-native/secure-storage-echo/ngx'
import { RouterTestingModule } from '@angular/router/testing'
import { IonicStorageModule } from '@ionic/storage'
import { QrscannerPage } from './qrscanner.page'
import { FirebaseService } from '../../services/firebase.service'
import { firebaseServiceStub } from '../../../test-utils/stubs/firebaseService'

describe('QrscannerPage', () => {
    let component: QrscannerPage
    let fixture: ComponentFixture<QrscannerPage>

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [ QrscannerPage ],
            imports: [
                IonicModule.forRoot(),
                IonicStorageModule.forRoot(),
                RouterTestingModule,
            ],
            providers: [
                {
                    provide: FirebaseService,
                    useValue: firebaseServiceStub,
                },
                { provide: Router },
                QRScanner,
                SecureStorageEcho,
            ],
        }).compileComponents()

        fixture = TestBed.createComponent(QrscannerPage)
        component = fixture.componentInstance
        fixture.detectChanges()
    }))

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
