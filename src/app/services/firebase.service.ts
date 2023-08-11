import { Injectable } from '@angular/core'
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database'
import { AngularFireFunctions } from '@angular/fire/functions'
import { AngularFireAuth } from '@angular/fire/auth'
import firebase from 'firebase/app'
import { Observable } from 'rxjs'
import { AngularFireMessaging } from '@angular/fire/messaging'
import User = firebase.User

@Injectable({
    providedIn: 'root',
})
export class FirebaseService {
    // eslint-disable-next-line no-useless-constructor
    constructor(
        private auth: AngularFireAuth,
        private database: AngularFireDatabase,
        private functions: AngularFireFunctions,
        private messaging: AngularFireMessaging,
    ) {
    }

    onAuthStateChanged(): Promise<ReturnType<firebase.auth.Auth['onAuthStateChanged']>> {
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        return this.auth.onAuthStateChanged(() => {})
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    callHttpsFunction(name: string): (data: any) => Observable<any> {
        return this.functions.httpsCallable(name)
    }

    signIn(token: string): ReturnType<firebase.auth.Auth['signInWithCustomToken']> {
        return this.auth.signInWithCustomToken(token)
    }

    updateAuthUser(user: User): ReturnType<firebase.auth.Auth['updateCurrentUser']> {
        return this.auth.updateCurrentUser(user)
    }

    getSessionIDReference(sessionID: string): firebase.database.Reference {
        return this.database.database.ref(`sessions/${sessionID}`)
    }

    setAuthPersistence(persistence: string): ReturnType<firebase.auth.Auth['setPersistence']> {
        return this.auth.setPersistence(persistence)
    }

    setNotificationToken(hatschiID: string, token: string): Promise<void> {
        return this.database.object(`users/${hatschiID}/fcmTokens/${token}`).set(true)
    }

    deleteNotificationToken(hatschiID: string, token: string): Promise<void> {
        return this.database.object(`users/${hatschiID}/fcmTokens/${token}`).remove()
    }

    requestNotificationToken(): Observable<string | null> {
        return this.messaging.requestToken
    }

    // eslint-disable-next-line @typescript-eslint/ban-types
    getNotifications(): Observable<{}> {
        return this.messaging.messages
    }

    getAllChats(hatschiID: string): AngularFireList<unknown> {
        return this.database.list(`users/${hatschiID}/chats`)
    }

    addNewChat(firstHatschiID: string, secondHatschiID: string): Promise<void> {
        return this.database.object(`users/${firstHatschiID}/chats/${secondHatschiID}`).set(true)
    }

    getChatReference(path: string): AngularFireObject<unknown> {
        return this.database.object(path)
    }

    getChatMessages(path: string): AngularFireList<unknown> {
        return this.database.list(path)
    }

    async getPublicKey(hatschiID: string): Promise<string> {
        const snapshot = await this.database.database.ref(`users/${hatschiID}/publicKey`).once('value')
        return snapshot.val()
    }

    async doesUserExist(hatschiID: string): Promise<boolean> {
        const snapshot = await this.database.database.ref(`hatschiIDs/${hatschiID}`).once('value')
        return snapshot.exists()
    }
}
