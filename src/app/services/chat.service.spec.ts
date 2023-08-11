import { TestBed } from '@angular/core/testing'

import { IonicStorageModule } from '@ionic/storage'
import { SecureStorageEcho } from '@ionic-native/secure-storage-echo/ngx'
import { Router } from '@angular/router'
import { Subscription } from 'rxjs'
import { ChatService } from './chat.service'
import { FirebaseService } from './firebase.service'
import { firebaseServiceStub } from '../../test-utils/stubs/firebaseService'
import { StorageService } from './storage.service'
import { IframeCommunicationService } from './iframe-communication.service'
import { CryptService } from './crypt.service'

describe('ChatService', () => {
    let service: ChatService
    let router: Router
    const storageServiceStub = {
        getUsername: hatschiID => Promise.resolve('Peter'),
        getSecretKey: () => Promise.resolve('secretKey'),
    }
    const iframeCommunicationServiceStub = {
        performOperation: () => Promise.resolve('secretKey2'),
    }
    const cryptServiceStub = {
        encryptMessage: () => '',
    }
    const routerStub = {
        navigateByUrl: url => Promise.resolve(),
    }

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                IonicStorageModule.forRoot(),
            ],
            providers: [
                {
                    provide: StorageService,
                    useValue: storageServiceStub,
                },
                {
                    provide: FirebaseService,
                    useValue: firebaseServiceStub,
                },
                {
                    provide: IframeCommunicationService,
                    useValue: iframeCommunicationServiceStub,
                },
                {
                    provide: CryptService,
                    useValue: cryptServiceStub,
                },
                SecureStorageEcho,
                {
                    provide: Router,
                    useValue: routerStub,
                },
            ],
        })
        service = TestBed.inject(ChatService)
        router = TestBed.inject(Router)
        service.platform.is = platform => true
    })

    it('should be created', () => {
        expect(service).toBeTruthy()
    })

    it('should return the username', async () => {
        const username = await service.getUsername('12345678')
        expect(username).toBe('Peter')
    })

    it('should return the chats', async () => {
        const chats = await service.getChats()
        expect(chats).toBeDefined()
    })

    it('should add a new chat with yourself', async () => {
        service.chat.myHatschiID = '12345678'
        service.chat.theirHatschiID = '12345678'
        const promises = await service.addChat(firebaseServiceStub.getChatReference(''))
        expect(promises.length).toBe(2)
    })

    it('should add a new chat withe someone else', async () => {
        service.chat.myHatschiID = '12345678'
        service.chat.theirHatschiID = 'abcdefgh'
        const promises = await service.addChat(firebaseServiceStub.getChatReference(''))
        expect(promises.length).toBe(3)
    })

    it('should open a chat', async () => {
        service.getTheirPublicKey = hatschiID => Promise.resolve('publicKey')
        service.chat.myHatschiID = '12345678'
        await service.openChat('abcdefgh')
        expect(service.chat.theirHatschiID).toBe('abcdefgh')
        expect(service.chat.chatID).toBe('12345678abcdefgh')
        expect(service.chat.theirName).toBe('Peter')
        expect(service.chat.theirPublicKey).toBe('publicKey')
    })

    it('should redirect the user when a new chat is opened in cordova', async () => {
        jest.spyOn(router, 'navigateByUrl')
        await service.openChat('abcdefgh')
        expect(router.navigateByUrl).toHaveBeenCalled()
    })

    // @TODO take a look at marble testing for observables
    // https://github.com/just-jeb/jest-marbles
    test.skip('should return the chat reference', async () => {
        service.chat.myHatschiID = '12345678'
        service.chat.theirHatschiID = 'abcdefgh'
        const result = await service.getChatReference()
    })

    test.skip('should call openChat() because chat does not exist', async () => {
        service.chat.myHatschiID = '12345678'
        service.chat.theirHatschiID = 'abcdefgh'
        const result = await service.getChatReference()
    })

    it('should return the secret key on cordova', async () => {
        const secretKey = await service.getSecretKey()
        expect(secretKey).toBe('secretKey')
    })

    it('should return the secret key in web', async () => {
        service.platform.is = platform => false
        const secretKey = await service.getSecretKey()
        expect(secretKey).toBe('secretKey2')
    })

    it('should send a message', async () => {
        service.chatReference = await firebaseServiceStub.getChatMessages('')
        jest.spyOn(service.chatReference, 'push')
        service.chat.myHatschiID = '12345678'
        await service.sendMessage('Lorem ipsum')
        expect(service.chatReference.push).toHaveBeenCalledWith({ sender: '12345678', text: '' })
    })

    it('should unsubscribe from chat observer', () => {
        service.chatObserver = new Subscription()
        jest.spyOn(service.chatObserver, 'unsubscribe')
        service.unsubscribeFromObserver()
        expect(service.chatObserver.unsubscribe).toHaveBeenCalled()
    })

    it('should return public key', async () => {
        const publicKey = await service.getTheirPublicKey('abcdefgh')
        expect(publicKey).toBe('publicKey')
    })

    test.each([
        [ '1234', 'abcdefgh', undefined ],
        [ '12345678', 'abcd', undefined ],
        [ undefined, 'abcd', undefined ],
        [ '12345678', undefined, undefined ],
    ])('should return undefined when chatID cannot be generated', (firstHatschiID: string, secondHatschiID: string, expectedResult: string | undefined) => {
        expect(service.getChatID(firstHatschiID, secondHatschiID)).toBe(expectedResult)
    })

    test.each([
        [ '12345678', 'abcdefgh', '12345678abcdefgh' ],
        [ 'abcdefgh', '12345678', '12345678abcdefgh' ],
    ])('should return %p and %p chatID: %p', (firstHatschiID: string, secondHatschiID: string, expectedResult: string | undefined) => {
        expect(service.getChatID(firstHatschiID, secondHatschiID)).toBe(expectedResult)
    })

    test.each([
        [ '12345678', true ],
        [ 'abcdefgh', false ],
    ])('should check if user %p exists, expected: %p', async (hatschiID: string, expectedResult: boolean) => {
        const result = await service.doesUserExist(hatschiID)
        expect(result).toBe(expectedResult)
    })
})
