import { AngularFireList, ChildEvent } from '@angular/fire/database'
import { Observable } from 'rxjs'
import { ChatService } from '../../app/services/chat.service'
import { firebaseServiceStub } from './firebaseService'

export const chatServiceStub: Partial<ChatService> = {
    chat: {
        myHatschiID: '12345678',
        theirHatschiID: '',
        theirPublicKey: 'publicKey',
        chatID: 'chatID',
    },
    openChat: theirHatschiID => Promise.resolve(),
    getChats: () => Promise.resolve(firebaseServiceStub.getAllChats('')),
    sendMessage: message => Promise.resolve(),
    getUsername: (theirHatschiID: string): Promise<string> => Promise.resolve('Peter'),
    unsubscribeFromObserver: () => jest.fn(),
    getSecretKey: (): Promise<string> => Promise.resolve(''),
    getChatReference: (): Promise<AngularFireList<unknown>> => Promise.resolve({
        // eslint-disable-next-line @typescript-eslint/ban-types
        valueChanges: (events?: ChildEvent[], options?: {}): Observable<unknown[]> => new Observable<unknown[]>(),
    } as AngularFireList<unknown>),
}
