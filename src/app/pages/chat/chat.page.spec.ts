import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing'

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { IonicStorageModule } from '@ionic/storage'
import { SecureStorageEcho } from '@ionic-native/secure-storage-echo/ngx'
import { Router } from '@angular/router'
import { RouterTestingModule } from '@angular/router/testing'
import { ChatPage } from './chat.page'
import { FirebaseService } from '../../services/firebase.service'
import { firebaseServiceStub } from '../../../test-utils/stubs/firebaseService'
import { ChatService } from '../../services/chat.service'
import { chatServiceStub } from '../../../test-utils/stubs/chatService'

describe('ChatPage', () => {
    let component: ChatPage
    let fixture: ComponentFixture<ChatPage>
    let chatService: ChatService

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [ ChatPage ],
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
                    provide: ChatService,
                    useValue: chatServiceStub,
                },
                { provide: Router },
                SecureStorageEcho,
            ],
        }).compileComponents()

        fixture = TestBed.createComponent(ChatPage)
        component = fixture.componentInstance
        chatService = TestBed.inject(ChatService)
        jest.spyOn(chatService, 'sendMessage')
        fixture.detectChanges()
    }))

    it('should create', () => {
        expect(component).toBeTruthy()
    })

    it('should send a message', async () => {
        await component.sendMessage('test')
        expect(chatService.sendMessage).toHaveBeenCalledWith('test')
    })

    test.skip('should scroll to bottom', () => {
        component.scrollToBottom()
        expect(component.content.scrollToBottom).toHaveBeenCalled()
    })
})
