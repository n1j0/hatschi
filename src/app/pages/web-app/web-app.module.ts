import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'

import { IonicModule } from '@ionic/angular'

import { WebAppPageRoutingModule } from './web-app-routing.module'

import { WebAppPage } from './web-app.page'
import { ChatListComponentModule } from '../../components/chat-list/chat-list.module'
import { ChatMessagesComponentModule } from '../../components/chat-messages/chat-messages.module'
import { MessageInputComponentModule } from '../../components/message-input/message-input.module'
import { NewChatInputComponentModule } from '../../components/new-chat-input/new-chat-input.module'

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        WebAppPageRoutingModule,
        ChatListComponentModule,
        ChatMessagesComponentModule,
        MessageInputComponentModule,
        NewChatInputComponentModule,
    ],
    declarations: [ WebAppPage ],
})
export class WebAppPageModule {}
