import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { IonicModule } from '@ionic/angular'
import { FormsModule } from '@angular/forms'
import { NewChatInputComponent } from './new-chat-input.component'

@NgModule({
    declarations: [ NewChatInputComponent ],
    imports: [
        CommonModule,
        IonicModule,
        FormsModule,
    ],
    exports: [
        NewChatInputComponent,
    ],
})

export class NewChatInputComponentModule {
}
