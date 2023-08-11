import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { IonicModule } from '@ionic/angular'
import { ChatMessagesComponent } from './chat-messages.component'

@NgModule({
    declarations: [ ChatMessagesComponent ],
    imports: [
        CommonModule,
        IonicModule,
    ],
    exports: [
        ChatMessagesComponent,
    ],
})

export class ChatMessagesComponentModule {
}
