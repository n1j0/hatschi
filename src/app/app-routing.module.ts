import { NgModule } from '@angular/core'
import { PreloadAllModules, RouterModule, Routes } from '@angular/router'

const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./pages/chats/chats.module').then(m => m.ChatsPageModule),
    },
    {
        path: 'chat',
        loadChildren: () => import('./pages/chat/chat.module').then(m => m.ChatPageModule),
    },
    {
        path: 'qrscanner',
        loadChildren: () => import('./pages/qrscanner/qrscanner.module').then(m => m.QrscannerPageModule),
    },
    {
        path: 'web-app',
        loadChildren: () => import('./pages/web-app/web-app.module').then(m => m.WebAppPageModule),
    },
    {
        path: 'new-chat',
        loadChildren: () => import('./pages/modals/new-chat/new-chat.module').then(m => m.NewChatPageModule),
    },
]

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
    ],
    exports: [ RouterModule ],
})
export class AppRoutingModule {
}
