import { Component, EventEmitter, Output } from '@angular/core'
import { Platform, ToastController } from '@ionic/angular'
import { ChatService } from '../../services/chat.service'

@Component({
    selector: 'app-new-chat-input',
    templateUrl: './new-chat-input.component.html',
    styleUrls: [ './new-chat-input.component.scss' ],
})
export class NewChatInputComponent {
    @Output() chatOpened = new EventEmitter<void>()

    theirHatschiID = ''

    // eslint-disable-next-line no-useless-constructor
    constructor(
        private chat: ChatService,
        public platform: Platform,
        private toast: ToastController,
    ) {
    }

    async openChat(): Promise<void> {
        const theirHatschiID = this.theirHatschiID.toLocaleLowerCase()
        if (await this.chat.doesUserExist(theirHatschiID)) {
            this.theirHatschiID = ''
            await this.chat.openChat(theirHatschiID)
            if (this.platform.is('cordova')) {
                this.chatOpened.emit()
            }
        } else {
            this.toast.create({
                message: 'User doesn\'t exist',
                keyboardClose: true,
                position: 'middle',
                duration: 2000,
            })
                .then(toast => toast.present())
        }
    }
}
