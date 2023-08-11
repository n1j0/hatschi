import { Component, EventEmitter, Input, OnChanges, OnDestroy, Output } from '@angular/core'
import { Subscription } from 'rxjs'
import { AngularFireList } from '@angular/fire/database'
import { Message } from '../../models/message'
import { ChatService } from '../../services/chat.service'
import { CryptService } from '../../services/crypt.service'

@Component({
    selector: 'app-chat-messages',
    templateUrl: './chat-messages.component.html',
    styleUrls: [ './chat-messages.component.scss' ],
})
export class ChatMessagesComponent implements OnChanges, OnDestroy {
    @Output() startScroll = new EventEmitter<string>()

    @Input() theirHatschiID: string

    messages: Array<Message>

    chatObserver: Subscription

    myHatschiID = ''

    constructor(
        private chatService: ChatService,
        private crypt: CryptService,
    ) {
        this.myHatschiID = this.chatService.chat.myHatschiID
    }

    async ngOnChanges(): Promise<void> {
        this.chatService.unsubscribeFromObserver()
        this.chatObserver?.unsubscribe()

        const secretKey = await this.chatService.getSecretKey()

        this.chatService.getChatReference()
            .then((chatReference: AngularFireList<unknown>) => {
                this.chatObserver = chatReference.valueChanges().subscribe(async (messages: Message[]) => {
                    this.messages = await Promise.all(messages.map(async (message: Message) => ({
                        sender: message.sender,
                        text: this.crypt.decryptMessage(
                            message.text,
                            secretKey,
                            this.chatService.chat.theirPublicKey,
                        ),
                    })))

                    // wait for DOM update
                    setTimeout(() => {
                        this.startScroll.emit()
                    }, 200)
                })
            })
    }

    ngOnDestroy(): void {
        this.chatService.unsubscribeFromObserver()
        this.chatObserver?.unsubscribe()
    }
}
