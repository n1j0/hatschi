import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing'

import { SecureStorageEcho } from '@ionic-native/secure-storage-echo/ngx'
import { IonicStorageModule } from '@ionic/storage'
import { Router } from '@angular/router'
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { Subscription } from 'rxjs'
import { By } from '@angular/platform-browser'
import { ChatMessagesComponent } from './chat-messages.component'
import { FirebaseService } from '../../services/firebase.service'
import { firebaseServiceStub } from '../../../test-utils/stubs/firebaseService'
import { ChatService } from '../../services/chat.service'
import { chatServiceStub } from '../../../test-utils/stubs/chatService'

describe('ChatMessagesComponent', () => {
    let component: ChatMessagesComponent
    let fixture: ComponentFixture<ChatMessagesComponent>
    let chatSpy

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [ ChatMessagesComponent ],
            schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
            imports: [
                IonicStorageModule.forRoot(),
            ],
            providers: [
                {
                    provide: FirebaseService,
                    useValue: firebaseServiceStub,
                },
                {
                    provide: ChatService,
                    useValue: chatServiceStub,
                },
                SecureStorageEcho,
                { provide: Router },
            ],
        }).compileComponents()

        fixture = TestBed.createComponent(ChatMessagesComponent)
        chatSpy = TestBed.inject(ChatService)
        jest.spyOn(chatSpy, 'unsubscribeFromObserver')
        jest.spyOn(chatSpy, 'getSecretKey')
        component = fixture.componentInstance
        fixture.detectChanges()
    }))

    it('should create', () => {
        expect(component).toBeTruthy()
    })

    it('should have a ngOnChanges lifecycle hook method', () => {
        expect(component.ngOnChanges).toBeTruthy()
    })

    it('should have a ngOnDestroy lifecycle hook method', () => {
        expect(component.ngOnDestroy).toBeTruthy()
    })

    it('should get the receivers hatschiID as input', () => {
        component.theirHatschiID = 'abcdefgh'
        fixture.detectChanges()
        expect(component.theirHatschiID).toBe('abcdefgh')
    })

    it('should set the own hatschiID', () => {
        expect(component.myHatschiID).toBe('12345678')
    })

    it('should unsubscribe from the chat observer when ngOnDestroy is called', () => {
        component.chatObserver = new Subscription()
        jest.spyOn(component.chatObserver, 'unsubscribe')
        component.ngOnDestroy()
        fixture.detectChanges()
        expect(chatSpy.unsubscribeFromObserver).toHaveBeenCalled()
        expect(component.chatObserver.unsubscribe).toHaveBeenCalled()
    })

    it('should unsubscribe from the chat observer when ngOnChanges is called', () => {
        component.chatObserver = new Subscription()
        jest.spyOn(component.chatObserver, 'unsubscribe')
        component.ngOnChanges()
        fixture.detectChanges()
        expect(chatSpy.unsubscribeFromObserver).toHaveBeenCalled()
        expect(component.chatObserver.unsubscribe).toHaveBeenCalled()
    })

    it('should get the secretKey when ngOnChanges is called', () => {
        component.ngOnChanges()
        expect(chatSpy.getSecretKey).toHaveBeenCalled()
    })

    it('should render messages', () => {
        component.messages = [
            {
                sender: '12345678',
                text: 'Lorem ipsum',
            },
            {
                sender: 'abcdefgh',
                text: 'Lorem ipsum',
            },
        ]
        fixture.detectChanges()
        expect(fixture.debugElement.queryAll(By.css('div.message')).length).toBe(2)
    })

    it('should set extra class to own messages', () => {
        component.messages = [
            {
                sender: '12345678',
                text: 'Lorem ipsum',
            },
        ]
        fixture.detectChanges()
        expect(fixture.debugElement.query(By.css('div.message')).classes.right).toBeTruthy()
    })

    it('should set primary color to own messages', () => {
        component.messages = [
            {
                sender: '12345678',
                text: 'Lorem ipsum',
            },
        ]
        fixture.detectChanges()
        expect(fixture.debugElement.query(By.css('div.message ion-item')).properties.color).toBe('primary')
    })

    it('should set secondary color to own messages', () => {
        component.messages = [
            {
                sender: 'abcdefgh',
                text: 'Lorem ipsum',
            },
        ]
        fixture.detectChanges()
        expect(fixture.debugElement.query(By.css('div.message ion-item')).properties.color).toBe('secondary')
    })

    it('should render message text in p tag', () => {
        component.messages = [
            {
                sender: 'abcdefgh',
                text: 'Lorem ipsum',
            },
        ]
        fixture.detectChanges()
        expect(fixture.debugElement.query(By.css('div.message ion-item p')).nativeElement.innerHTML).toBe('Lorem ipsum')
    })

    test.skip('should emit a scroll event when ngOnChanges is called', () => {
        jest.spyOn(component.startScroll, 'emit')
        component.ngOnChanges()
        expect(component.startScroll.emit).toHaveBeenCalled()
    })
})
