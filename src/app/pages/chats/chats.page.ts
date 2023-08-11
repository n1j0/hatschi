import { Component } from '@angular/core'
import { ModalController } from '@ionic/angular'
import { NewChatPage } from '../modals/new-chat/new-chat.page'
import { ChatService } from '../../services/chat.service'

@Component({
    selector: 'app-chats',
    templateUrl: './chats.page.html',
    styleUrls: [ './chats.page.scss' ],
})
export class ChatsPage {
    // eslint-disable-next-line no-useless-constructor
    constructor(
        private modal: ModalController,
        public chat: ChatService,
    ) {
    }

    async openNewChatModal(): Promise<void> {
        const modal = await this.modal.create({
            component: NewChatPage,
        })

        await modal.present()
    }
}
