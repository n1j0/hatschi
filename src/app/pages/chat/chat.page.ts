import { Component, ViewChild } from '@angular/core'
import { IonContent } from '@ionic/angular'
import { ChatService } from '../../services/chat.service'

@Component({
    selector: 'app-chat',
    templateUrl: './chat.page.html',
    styleUrls: [ './chat.page.scss' ],
})
export class ChatPage {
    @ViewChild(IonContent) content: IonContent

    theirName = ''

    constructor(
        public chatService: ChatService,
    ) {
        this.theirName = this.chatService.chat.theirName || this.chatService.chat.theirHatschiID
    }

    async sendMessage(messageText: string): Promise<void> {
        await this.chatService.sendMessage(messageText)
    }

    scrollToBottom(): void {
        this.content.scrollToBottom()
    }
}
