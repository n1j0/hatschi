import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { RouteReuseStrategy } from '@angular/router'
import { FormsModule } from '@angular/forms'
import { IonicModule, IonicRouteStrategy } from '@ionic/angular'
import { SplashScreen } from '@ionic-native/splash-screen/ngx'
import { StatusBar } from '@ionic-native/status-bar/ngx'
import { SecureStorageEcho } from '@ionic-native/secure-storage-echo/ngx'
import { IonicStorageModule } from '@ionic/storage'
import { QRCodeModule } from 'angularx-qrcode'
import { QRScanner } from '@ionic-native/qr-scanner/ngx'
import { FCM } from 'cordova-plugin-fcm-with-dependecy-updated/ionic/ngx'

import { AngularFireModule } from '@angular/fire'
import { AngularFireMessagingModule } from '@angular/fire/messaging'
import { environment } from '../environments/environment'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'

@NgModule({
    declarations: [ AppComponent ],
    entryComponents: [],
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        FormsModule,
        AngularFireModule.initializeApp(environment.firebase),
        IonicStorageModule.forRoot(),
        AngularFireMessagingModule,
        QRCodeModule,
    ],
    providers: [
        StatusBar,
        SplashScreen,
        SecureStorageEcho,
        QRScanner,
        FCM,
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    ],
    bootstrap: [ AppComponent ],
})
export class AppModule {
}
