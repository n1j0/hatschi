import { Injectable } from '@angular/core'
import { AngularFireList, AngularFireObject } from '@angular/fire/database'
import { Subscription } from 'rxjs'
import { Platform } from '@ionic/angular'
import { Router } from '@angular/router'
import { Chat } from '../models/chat'
import { StorageService } from './storage.service'
import { Message } from '../models/message'
import { CryptService } from './crypt.service'
import { IframeCommunicationService } from './iframe-communication.service'
import { FirebaseService } from './firebase.service'

@Injectable({
    providedIn: 'root',
})

export class ChatService {
    chatObserver: Subscription

    chatReference: AngularFireList<unknown>

    chat: Chat

    constructor(
        private crypt: CryptService,
        private storageService: StorageService,
        public platform: Platform,
        private router: Router,
        private iframeCommuniation: IframeCommunicationService,
        private firebase: FirebaseService,
    ) {
        this.chat = new Chat()
    }

    async getUsername(theirHatschiID: string): Promise<string> {
        return this.storageService.getUsername(theirHatschiID)
    }

    async getChats(): Promise<AngularFireList<unknown>> {
        return this.firebase.getAllChats(this.chat.myHatschiID)
    }

    addChat(chatReference: AngularFireObject<unknown>): Promise<void[]> {
        const promises: Array<Promise<void>> = new Array<Promise<void>>(
            this.firebase.addNewChat(this.chat.myHatschiID, this.chat.theirHatschiID),
            chatReference.set(true),
        )

        if (this.chat.myHatschiID !== this.chat.theirHatschiID) {
            promises.push(this.firebase.addNewChat(this.chat.theirHatschiID, this.chat.myHatschiID))
        }

        return Promise.all(promises)
    }

    async openChat(theirHatschiID: string): Promise<void> {
        this.chat.theirHatschiID = theirHatschiID
        this.chat.chatID = this.getChatID(this.chat.myHatschiID, theirHatschiID)
        const [ theirName, theirPublicKey ] = await Promise.all([
            await this.getUsername(theirHatschiID),
            await this.getTheirPublicKey(theirHatschiID),
        ])
        this.chat.theirName = theirName
        this.chat.theirPublicKey = theirPublicKey

        if (this.platform.is('cordova')) {
            await this.router.navigateByUrl('/chat')
        }
    }

    getChatReference(): Promise<AngularFireList<unknown>> {
        const messagesPath = `messages/${this.chat.chatID}`
        const reference = this.firebase.getChatReference(messagesPath)
        return new Promise((resolve) => {
            this.chatObserver = reference.snapshotChanges().subscribe(async (snapshot) => {
                if (snapshot.payload.exists()) {
                    this.chatReference = this.firebase.getChatMessages(messagesPath)
                    resolve(this.chatReference)
                } else if (this.chat.chatID) {
                    await this.addChat(reference)
                }
            })
        })
    }

    async getSecretKey(): Promise<string> {
        return this.platform.is('cordova')
            ? this.storageService.getSecretKey()
            : this.iframeCommuniation.performOperation()
    }

    async sendMessage(messageText: string): Promise<void> {
        const secretKey = await this.getSecretKey()
        const message: Message = {
            sender: this.chat.myHatschiID,
            text: this.crypt.encryptMessage(
                messageText,
                secretKey,
                this.chat.theirPublicKey,
            ),
        }
        this.chatReference.push(message)
    }

    unsubscribeFromObserver(): void {
        this.chatObserver?.unsubscribe()
    }

    async getTheirPublicKey(theirHatschiID: string): Promise<string> {
        return this.firebase.getPublicKey(theirHatschiID)
    }

    // eslint-disable-next-line class-methods-use-this
    getChatID(myHatschiID: string, theirHatschiID: string): string {
        if (myHatschiID?.length !== 8 || theirHatschiID?.length !== 8) {
            return undefined
        }

        return myHatschiID.localeCompare(theirHatschiID) < 0
            ? `${myHatschiID}${theirHatschiID}`
            : `${theirHatschiID}${myHatschiID}`
    }

    doesUserExist(theirHatschiID: string): Promise<boolean> {
        return this.firebase.doesUserExist(theirHatschiID)
    }
}
