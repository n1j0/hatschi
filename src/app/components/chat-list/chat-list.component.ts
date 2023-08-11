import { Component, OnInit } from '@angular/core'
import { Subscription } from 'rxjs'
import { AlertController, Platform, ViewWillLeave } from '@ionic/angular'
import { ChatService } from '../../services/chat.service'
import { User } from '../../models/user'
import { StorageService } from '../../services/storage.service'

@Component({
    selector: 'app-chat-list',
    templateUrl: './chat-list.component.html',
    styleUrls: [ './chat-list.component.scss' ],
})
export class ChatListComponent implements OnInit, ViewWillLeave {
    users: Array<User> = new Array<User>()

    chatsObserver: Subscription

    // eslint-disable-next-line no-useless-constructor
    constructor(
        private alertController: AlertController,
        private storage: StorageService,
        private chatService: ChatService,
        public platform: Platform,
    ) {
    }

    async ngOnInit(): Promise<void> {
        const chats = await this.chatService.getChats()
        this.chatsObserver = chats.snapshotChanges().subscribe(async (snapshotData) => {
            this.users = await Promise.all(snapshotData.map(async data => ({
                hatschiID: data.key,
                name: await this.chatService.getUsername(data.key),
            })))
        })
    }

    ionViewWillLeave(): void {
        this.chatsObserver?.unsubscribe()
    }

    async openChat(theirHatschiID: string): Promise<void> {
        await this.chatService.openChat(theirHatschiID)
    }

    async editNameOfUser(theirHatschiID: string): Promise<void> {
        if (!this.platform.is('cordova')) {
            this.alertController.create({
                header: 'Feature not yet supported',
                message: 'You can change the name of your hatschi contacts on desktop soon',
                buttons: [
                    {
                        text: 'Ok',
                    },
                ],
            }).then((alert) => {
                alert.present()
            })
            return
        }

        const currentUsername = await this.chatService.getUsername(theirHatschiID)
        const alert = await this.alertController.create({
            header: 'Change username',
            inputs: [
                {
                    name: 'username',
                    type: 'text',
                    value: currentUsername,
                    placeholder: 'Username',
                },
            ],
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                }, {
                    text: 'Save',
                    handler: async (data) => {
                        await this.storage.setUsername(theirHatschiID, data.username)
                        const indexOfCurrentUser = this.users.findIndex(user => user.hatschiID === theirHatschiID)
                        this.users[indexOfCurrentUser].name = data.username
                    },
                },
            ],
        })

        await alert.present()
    }
}
