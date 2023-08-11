import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing'
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { By } from '@angular/platform-browser'
import { MessageInputComponent } from './message-input.component'

describe('MessageInputComponent', () => {
    let component: MessageInputComponent
    let fixture: ComponentFixture<MessageInputComponent>

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [ MessageInputComponent ],
            schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
        }).compileComponents()

        fixture = TestBed.createComponent(MessageInputComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    }))

    it('should create', () => {
        expect(component).toBeTruthy()
    })

    it('should disable button when input is empty', () => {
        expect(fixture.debugElement.query(By.css('ion-button')).properties.disabled).toBeTruthy()
    })

    it('should enable button when input is not empty', () => {
        component.messageText = 'Lorem ipsum'
        fixture.detectChanges()
        expect(fixture.debugElement.query(By.css('ion-button')).properties.disabled).toBeFalsy()
    })

    it('should emit the message and clear the input', () => {
        spyOn(component.newMessage, 'emit')
        component.messageText = 'Lorem ipsum'
        fixture.nativeElement.querySelector('ion-button').dispatchEvent(new Event('click'))
        fixture.detectChanges()
        expect(component.newMessage.emit).toHaveBeenCalledWith('Lorem ipsum')
        expect(component.messageText).toBe('')
    })
})
