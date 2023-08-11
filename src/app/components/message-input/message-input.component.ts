import { Component, EventEmitter, Output } from '@angular/core'

@Component({
    selector: 'app-message-input',
    templateUrl: './message-input.component.html',
    styleUrls: [ './message-input.component.scss' ],
})

export class MessageInputComponent {
    @Output() newMessage = new EventEmitter<string>()

    messageText = ''

    sendMessage(): void {
        this.newMessage.emit(this.messageText)
        this.messageText = ''
    }
}
