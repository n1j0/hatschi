import { Component } from '@angular/core'
import { ChatService } from '../../services/chat.service'

@Component({
    selector: 'app-web-app',
    templateUrl: './web-app.page.html',
    styleUrls: [ './web-app.page.scss' ],
})
export class WebAppPage {
    myHatschiID = ''

    constructor(public chatService: ChatService) {
        this.myHatschiID = sessionStorage.getItem('myHatschiID')
    }

    async sendMessage(messageText: string): Promise<void> {
        await this.chatService.sendMessage(messageText)
    }
}
