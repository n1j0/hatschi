import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { IonicModule } from '@ionic/angular'
import { ChatListComponent } from './chat-list.component'

@NgModule({
    declarations: [ ChatListComponent ],
    imports: [
        CommonModule,
        IonicModule,
    ],
    exports: [
        ChatListComponent,
    ],
})

export class ChatListComponentModule {
}
