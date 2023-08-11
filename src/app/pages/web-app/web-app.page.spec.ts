import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing'
import { IonicModule } from '@ionic/angular'

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { IonicStorageModule } from '@ionic/storage'
import { SecureStorageEcho } from '@ionic-native/secure-storage-echo/ngx'
import { Router } from '@angular/router'
import { RouterTestingModule } from '@angular/router/testing'
import { WebAppPage } from './web-app.page'
import { FirebaseService } from '../../services/firebase.service'
import { firebaseServiceStub } from '../../../test-utils/stubs/firebaseService'

describe('WebAppPage', () => {
    let component: WebAppPage
    let fixture: ComponentFixture<WebAppPage>

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [ WebAppPage ],
            imports: [
                IonicModule.forRoot(),
                IonicStorageModule.forRoot(),
                RouterTestingModule,
            ],
            schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
            providers: [
                {
                    provide: FirebaseService,
                    useValue: firebaseServiceStub,
                },
                SecureStorageEcho,
                { provide: Router },
            ],
        }).compileComponents()

        fixture = TestBed.createComponent(WebAppPage)
        component = fixture.componentInstance
        fixture.detectChanges()
    }))

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
