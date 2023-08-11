import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing'

import { IonicStorageModule } from '@ionic/storage'
import { SecureStorageEcho } from '@ionic-native/secure-storage-echo/ngx'
import { Router } from '@angular/router'
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { AlertController } from '@ionic/angular'
import { Subscription } from 'rxjs'
import { By } from '@angular/platform-browser'
import { ChatListComponent } from './chat-list.component'
import { FirebaseService } from '../../services/firebase.service'
import { firebaseServiceStub } from '../../../test-utils/stubs/firebaseService'
import { ChatService } from '../../services/chat.service'
import { chatServiceStub } from '../../../test-utils/stubs/chatService'
import { AlertControllerMock } from '../../../test-utils/mocks/alertController'

describe('ChatListComponent', () => {
    let component: ChatListComponent
    let fixture: ComponentFixture<ChatListComponent>
    let chatSpy
    const alertCtrlSpy = AlertControllerMock.instance()

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [ ChatListComponent ],
            schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
            imports: [
                IonicStorageModule.forRoot(),
            ],
            providers: [
                SecureStorageEcho,
                {
                    provide: FirebaseService,
                    useValue: firebaseServiceStub,
                },
                {
                    provide: ChatService,
                    useValue: chatServiceStub,
                },
                {
                    provide: AlertController,
                    useFactory: () => alertCtrlSpy,
                },
                { provide: Router },
            ],
        }).compileComponents()

        fixture = TestBed.createComponent(ChatListComponent)
        chatSpy = TestBed.inject(ChatService)
        jest.spyOn(chatSpy, 'getChats')
        jest.spyOn(chatSpy, 'openChat')
        jest.spyOn(chatSpy, 'getUsername')
        component = fixture.componentInstance
        fixture.detectChanges()
    }))

    it('should create', () => {
        expect(component).toBeTruthy()
    })

    it('should have a ngOnInit lifecycle hook method', () => {
        expect(component.ngOnInit).toBeTruthy()
    })

    it('should have a ionViewWillLeave lifecycle hook method', () => {
        expect(component.ionViewWillLeave).toBeTruthy()
    })

    it('should receive the chats when the ngOnInit lifecycle hook is called', async () => {
        await component.ngOnInit()
        expect(chatSpy.getChats).toHaveBeenCalled()
    })

    // @TODO take a look at marble testing for observables
    // https://github.com/just-jeb/jest-marbles
    test.skip('should return an observer of the chats', async () => {
        await component.ngOnInit()
    })

    test.skip('should set the users and get their stored name if possible', async () => {
        await component.ngOnInit()
    })

    it('should receive the chats when the ngOnInit lifecycle hook is called', async () => {
        component.chatsObserver = new Subscription()
        jest.spyOn(component.chatsObserver, 'unsubscribe')
        await component.ionViewWillLeave()
        expect(component.chatsObserver.unsubscribe).toHaveBeenCalled()
    })

    it('should open a chat', () => {
        component.users = [
            {
                hatschiID: 'hatschi1',
            },
        ]
        fixture.detectChanges()
        fixture.nativeElement.querySelector('ion-item').dispatchEvent(new Event('click'))
        fixture.detectChanges()
        expect(chatSpy.openChat).toHaveBeenCalledWith('hatschi1')
    })

    // @TODO investigate - expected equals received, but type is different. Maybe the mock has to be adjusted
    test.skip('should show an alert to edit the name of a user on cordova', () => {
        component.platform.is = () => true
        component.users = [
            {
                hatschiID: 'abcdefgh',
            },
        ]
        fixture.detectChanges()
        fixture.nativeElement.querySelector('ion-item-options').dispatchEvent(new Event('ionSwipe'))
        fixture.detectChanges()
        expect(chatSpy.getUsername).toHaveBeenCalled()
        expect(alertCtrlSpy.create).toHaveBeenCalledWith({
            buttons: [
                { role: 'cancel', text: 'Cancel' },
                { handler: async () => jest.fn(), text: 'Save' } ],
            header: 'Change username',
            inputs: [ { name: 'username', placeholder: 'Username', type: 'text', value: 'Peter' } ],
        })
    })

    it('should show an alert taht user edit function is not available on web', () => {
        component.platform.is = () => false
        component.users = [
            {
                hatschiID: 'abcdefgh',
            },
        ]
        fixture.detectChanges()
        fixture.nativeElement.querySelector('ion-item-options').dispatchEvent(new Event('ionSwipe'))
        fixture.detectChanges()
        expect(chatSpy.getUsername).not.toHaveBeenCalled()
        expect(alertCtrlSpy.create).toHaveBeenCalledWith({
            header: 'Feature not yet supported',
            message: 'You can change the name of your hatschi contacts on desktop soon',
            buttons: [
                {
                    text: 'Ok',
                },
            ],
        })
    })

    it('should render sliding items for each user', () => {
        component.users = [
            {
                hatschiID: 'hatschi1',
            },
            {
                hatschiID: 'hatschi2',
            },
        ]
        fixture.detectChanges()
        expect(fixture.debugElement.queryAll(By.css('ion-item-sliding')).length).toBe(2)
    })

    it('should render hatschiID because no name is stored', () => {
        component.users = [
            {
                hatschiID: 'hatschi1',
            },
        ]
        fixture.detectChanges()
        expect(fixture.debugElement.query(By.css('ion-label h3')).nativeElement.innerHTML).toBe('hatschi1')
    })

    it('should render name because name is stored', () => {
        component.users = [
            {
                hatschiID: 'abcdefgh',
                name: 'Peter',
            },
        ]
        fixture.detectChanges()
        expect(fixture.debugElement.query(By.css('ion-label h3')).nativeElement.innerHTML).toBe('Peter')
    })
})
