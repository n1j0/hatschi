/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import firebase from 'firebase/app'
import { Observable } from 'rxjs'
import { AngularFireList, AngularFireObject, SnapshotAction } from '@angular/fire/database'
import { FirebaseService } from '../../app/services/firebase.service'
import User = firebase.User

export const firebaseServiceStub: Partial<FirebaseService> = {
    onAuthStateChanged: (): Promise<ReturnType<firebase.auth.Auth['onAuthStateChanged']>> => Promise.resolve({} as firebase.Unsubscribe),
    callHttpsFunction: (name: string): (data: any) => Observable<any> => () => new Observable(),
    signIn: (token: string): ReturnType<firebase.auth.Auth['signInWithCustomToken']> => Promise.resolve({} as firebase.auth.UserCredential),
    updateAuthUser: (user: User): ReturnType<firebase.auth.Auth['updateCurrentUser']> => Promise.resolve(),
    getSessionIDReference: (sessionID: string): firebase.database.Reference => <firebase.database.Reference>{},
    setAuthPersistence: (persistence: string): ReturnType<firebase.auth.Auth['setPersistence']> => Promise.resolve(),
    setNotificationToken: (hatschiID: string, token: string): Promise<void> => Promise.resolve(),
    deleteNotificationToken: (hatschiID: string, token: string): Promise<void> => Promise.resolve(),
    requestNotificationToken: (): Observable<string | null> => new Observable<string | null>(),
    // eslint-disable-next-line @typescript-eslint/ban-types
    getNotifications: (): Observable<{}> => new Observable<{}>(),
    getAllChats: (hatschiID: string): AngularFireList<unknown> => <AngularFireList<unknown>><unknown>{
        snapshotChanges: (): Observable<SnapshotAction<unknown>> => new Observable<SnapshotAction<unknown>>(),
    },
    addNewChat: (firstHatschiID: string, secondHatschiID: string): Promise<void> => Promise.resolve(),
    getChatReference: (path: string): AngularFireObject<unknown> => <AngularFireObject<unknown>>{
        set: val => Promise.resolve(),
        snapshotChanges: (): Observable<SnapshotAction<unknown>> => new Observable<SnapshotAction<unknown>>(),
    },
    getChatMessages: (path: string): AngularFireList<unknown> => <AngularFireList<unknown>>{
        push: (val): firebase.database.ThenableReference => <firebase.database.ThenableReference>{},
    },
    getPublicKey: (hatschiID: string): Promise<string> => Promise.resolve('publicKey'),
    doesUserExist: (hatschiID: string): Promise<boolean> => Promise.resolve(hatschiID === '12345678'),
}
