import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { NewChatPage } from './new-chat.page'

const routes: Routes = [
    {
        path: '',
        component: NewChatPage,
    },
]

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ],
})
export class NewChatPageRoutingModule {
}
