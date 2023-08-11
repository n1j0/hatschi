import { Component } from '@angular/core'
import { ModalController } from '@ionic/angular'

@Component({
    selector: 'app-new-chat',
    templateUrl: './new-chat.page.html',
    styleUrls: [ './new-chat.page.scss' ],
})
export class NewChatPage {
    // eslint-disable-next-line no-useless-constructor
    constructor(
        private modal: ModalController,
    ) {
    }

    async dismissModal(): Promise<void> {
        await this.modal.dismiss()
    }
}
