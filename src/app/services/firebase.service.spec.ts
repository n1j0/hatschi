import { TestBed } from '@angular/core/testing'

import { AngularFireAuth } from '@angular/fire/auth'
import { AngularFireMessaging } from '@angular/fire/messaging'
import { AngularFireFunctions } from '@angular/fire/functions'
import { AngularFireDatabase } from '@angular/fire/database'
import firebase from 'firebase'
import { FirebaseService } from './firebase.service'
import { angularFireAuthStub } from '../../test-utils/stubs/angularFireAuth'
import { angularFireDatabaseStub } from '../../test-utils/stubs/angularFireDatabase'
import { angularFireFunctionsStub } from '../../test-utils/stubs/angularFireFunctions'
import { angularFireMessagingStub } from '../../test-utils/stubs/angularFireMessaging'
import User = firebase.User

describe('FirebaseService', () => {
    let service: FirebaseService
    let auth: AngularFireAuth
    let database: AngularFireDatabase
    let functions: AngularFireFunctions
    let messaging: AngularFireMessaging

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                {
                    provide: AngularFireAuth,
                    useValue: angularFireAuthStub,
                },
                {
                    provide: AngularFireDatabase,
                    useValue: angularFireDatabaseStub,
                },
                {
                    provide: AngularFireFunctions,
                    useValue: angularFireFunctionsStub,
                },
                {
                    provide: AngularFireMessaging,
                    useValue: angularFireMessagingStub,
                },
            ],
        })
        service = TestBed.inject(FirebaseService)
        auth = TestBed.inject(AngularFireAuth)
        database = TestBed.inject(AngularFireDatabase)
        functions = TestBed.inject(AngularFireFunctions)
        messaging = TestBed.inject(AngularFireMessaging)
        jest.spyOn(auth, 'onAuthStateChanged')
        jest.spyOn(auth, 'signInWithCustomToken')
        jest.spyOn(auth, 'updateCurrentUser')
        jest.spyOn(auth, 'setPersistence')
        jest.spyOn(database, 'object')
        jest.spyOn(database, 'list')
        jest.spyOn(functions, 'httpsCallable')
    })

    it('should be created', () => {
        expect(service).toBeTruthy()
    })

    it('should check for auth changes', async () => {
        await service.onAuthStateChanged()
        expect(auth.onAuthStateChanged).toHaveBeenCalled()
    })

    it('should call cloud function', async () => {
        await service.callHttpsFunction('function')
        expect(functions.httpsCallable).toHaveBeenCalledWith('function')
    })

    it('should sign in with custom token', async () => {
        await service.signIn('token')
        expect(auth.signInWithCustomToken).toHaveBeenCalledWith('token')
    })

    it('should update current user', async () => {
        await service.updateAuthUser({} as User)
        expect(auth.updateCurrentUser).toHaveBeenCalledWith({} as User)
    })

    test.skip('should return the session id reference', async () => {
        await service.getSessionIDReference('qwertz')
    })

    it('should set the auth persistence', async () => {
        await service.setAuthPersistence('session')
        expect(auth.setPersistence).toHaveBeenCalledWith('session')
    })

    test.skip('should set the notification token', async () => {
        await service.setNotificationToken('12345678', 'someToken')
        expect(database.object).toHaveBeenCalledWith('users/12345678/fcmTokens/someToken')
        // @TODO check if set is called afterwards
    })

    test.skip('should delete the notification token', async () => {
        await service.setNotificationToken('12345678', 'someToken')
        expect(database.object).toHaveBeenCalledWith('users/12345678/fcmTokens/someToken')
        // @TODO check if remove is called afterwards
    })

    it('should return the notification token', async () => {
        await service.requestNotificationToken()
        expect(messaging.requestToken).toBeTruthy()
    })

    it('should return the notifications', async () => {
        await service.getNotifications()
        expect(messaging.messages).toBeTruthy()
    })

    it('should return all chats', async () => {
        await service.getAllChats('12345678')
        expect(database.list).toHaveBeenCalledWith('users/12345678/chats')
    })

    it('should add a new chat', async () => {
        await service.addNewChat('12345678', 'abcdefgh')
        expect(database.object).toHaveBeenCalledWith('users/12345678/chats/abcdefgh')
    })

    it('should return a chat reference', async () => {
        await service.getChatReference('somePath')
        expect(database.object).toHaveBeenCalledWith('somePath')
    })

    it('should return chat messages', async () => {
        await service.getChatMessages('somePath')
        expect(database.list).toHaveBeenCalledWith('somePath')
    })

    test.skip('should return the public key', async () => {
        expect(await service.getPublicKey('somePath')).toBeTruthy()
    })

    /*
        test.each([
            [ '12345678', true ],
            [ 'abcdefgh', false ],
        ])('should return if %p exist: %p', async (hatschiID: string, expectedResult: boolean) => {
            expect(await service.doesUserExist(hatschiID)).toBe(expectedResult)
        })
     */
})
