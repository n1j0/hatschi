import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { WebAppPage } from './web-app.page'

const routes: Routes = [
    {
        path: '',
        component: WebAppPage,
    },
]

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ],
})
export class WebAppPageRoutingModule {}
