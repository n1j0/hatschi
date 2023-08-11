import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing'
import { ModalController } from '@ionic/angular'

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { SecureStorageEcho } from '@ionic-native/secure-storage-echo/ngx'
import { RouterTestingModule } from '@angular/router/testing'
import { IonicStorageModule } from '@ionic/storage'
import { ChatsPage } from './chats.page'
import { FirebaseService } from '../../services/firebase.service'
import { firebaseServiceStub } from '../../../test-utils/stubs/firebaseService'
import { ModalControllerMock } from '../../../test-utils/mocks/modalController'

describe('ChatsPage', () => {
    let component: ChatsPage
    let fixture: ComponentFixture<ChatsPage>
    const modalControllerMock = ModalControllerMock.instance()

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [ ChatsPage ],
            imports: [
                IonicStorageModule.forRoot(),
                RouterTestingModule,
            ],
            schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
            providers: [
                {
                    provide: FirebaseService,
                    useValue: firebaseServiceStub,
                },
                {
                    provide: ModalController,
                    useFactory: () => modalControllerMock,
                },
                SecureStorageEcho,
            ],
        }).compileComponents()

        fixture = TestBed.createComponent(ChatsPage)
        component = fixture.componentInstance
        fixture.detectChanges()
    }))

    it('should create', () => {
        expect(component).toBeTruthy()
    })

    it('should open a modal', async () => {
        await component.openNewChatModal()
        expect(modalControllerMock.create).toHaveBeenCalled()
    })
})
