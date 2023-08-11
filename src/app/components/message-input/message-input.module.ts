import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { IonicModule } from '@ionic/angular'
import { FormsModule } from '@angular/forms'
import { MessageInputComponent } from './message-input.component'

@NgModule({
    declarations: [ MessageInputComponent ],
    imports: [
        CommonModule,
        IonicModule,
        FormsModule,
    ],
    exports: [
        MessageInputComponent,
    ],
})

export class MessageInputComponentModule {
}
