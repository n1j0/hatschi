import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing'
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { By } from '@angular/platform-browser'
import { Platform, ToastController } from '@ionic/angular'
import { NewChatInputComponent } from './new-chat-input.component'
import { ChatService } from '../../services/chat.service'
import { ToastControllerMock } from '../../../test-utils/mocks/toastController'

describe('NewChatInputComponent', () => {
    let component: NewChatInputComponent
    let fixture: ComponentFixture<NewChatInputComponent>
    let chatService: ChatService
    const toastControllerMock = ToastControllerMock.instance()

    const chatServiceStub: Partial<ChatService> = {
        doesUserExist(theirHatschiID: string): Promise<boolean> {
            return Promise.resolve(theirHatschiID === 'abcdefgh')
        },
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        async openChat(theirHatschiID: string): Promise<void> {
            return Promise.resolve()
        },
    }

    const platformStub: Partial<Platform> = {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        is(platformName): boolean {
            return false
        },
    }

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [ NewChatInputComponent ],
            providers: [
                {
                    provide: ChatService,
                    useValue: chatServiceStub,
                },
                {
                    provide: Platform,
                    useValue: platformStub,
                },
                {
                    provide: ToastController,
                    useFactory: () => toastControllerMock,
                },
            ],
            schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
        }).compileComponents()

        fixture = TestBed.createComponent(NewChatInputComponent)
        component = fixture.componentInstance
        chatService = TestBed.inject(ChatService)

        fixture.detectChanges()
    }))

    it('should create', () => {
        expect(component).toBeTruthy()
    })

    it('should disable button when input text has not a length of 8', () => {
        const btn = fixture.debugElement.query(By.css('ion-button'))
        expect(btn.properties.disabled).toBeTruthy()

        component.theirHatschiID = '1234567'
        fixture.detectChanges()
        expect(btn.properties.disabled).toBeTruthy()
    })

    it('should enable button when input text has a length of 8', () => {
        component.theirHatschiID = '12345678'
        fixture.detectChanges()
        expect(fixture.debugElement.query(By.css('ion-button')).properties.disabled).toBeFalsy()
    })

    it('should open toast message when user does not exist', () => {
        component.theirHatschiID = '12345678'
        fixture.nativeElement.querySelector('ion-button').dispatchEvent(new Event('click'))
        fixture.detectChanges()
        expect(toastControllerMock.create).toHaveBeenCalled()
    })

    it('should open a new chat', () => {
        jest.spyOn(chatService, 'openChat')
        component.theirHatschiID = 'abcdefgh'
        fixture.nativeElement.querySelector('ion-button').dispatchEvent(new Event('click'))
        fixture.detectChanges()
        expect(component.theirHatschiID).toBe('')
        expect(chatService.openChat).toHaveBeenCalled()
    })

    it('should emit an event on cordova devices', () => {
        component.platform.is = () => true
        jest.spyOn(component.chatOpened, 'emit')
        component.theirHatschiID = 'abcdefgh'
        fixture.nativeElement.querySelector('ion-button').dispatchEvent(new Event('click'))
        fixture.detectChanges()
        expect(component.chatOpened.emit).toHaveBeenCalled()
    })
})
