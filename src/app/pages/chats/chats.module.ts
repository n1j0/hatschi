import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'

import { IonicModule } from '@ionic/angular'

import { ChatsPageRoutingModule } from './chats-routing.module'

import { ChatsPage } from './chats.page'
import { ChatListComponentModule } from '../../components/chat-list/chat-list.module'

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ChatsPageRoutingModule,
        ChatListComponentModule,
    ],
    declarations: [ ChatsPage ],
})
export class ChatsPageModule {
}
