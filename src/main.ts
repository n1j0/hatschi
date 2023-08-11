import { enableProdMode } from '@angular/core'
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/functions'
import { AppModule } from './app/app.module'
import { environment } from './environments/environment'

if (environment.production) {
    enableProdMode()
} else if (environment.useEmulator) {
    firebase.initializeApp({
        apiKey: 'AIzaSyA7CMfHOMzHdBMnQQENAxHcvYxouPvc0KE',
        projectId: 'local',
        databaseURL: 'http://localhost:9000/?ns=local',
    })
    firebase.auth().useEmulator('http://localhost:9099')
    firebase.database().useEmulator('localhost', 9000)
    firebase.functions().useEmulator('localhost', 5001)
}

platformBrowserDynamic().bootstrapModule(AppModule)
    .catch(err => console.log(err))
