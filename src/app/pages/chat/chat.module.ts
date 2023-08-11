import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'

import { IonicModule } from '@ionic/angular'

import { ChatPageRoutingModule } from './chat-routing.module'

import { ChatPage } from './chat.page'
import { MessageInputComponentModule } from '../../components/message-input/message-input.module'
import { ChatMessagesComponentModule } from '../../components/chat-messages/chat-messages.module'

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ChatPageRoutingModule,
        MessageInputComponentModule,
        ChatMessagesComponentModule,
    ],
    declarations: [ ChatPage ],
})
export class ChatPageModule {}
