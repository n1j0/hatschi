import { Injectable } from '@angular/core'
import { fromEvent } from 'rxjs'
import { map } from 'rxjs/operators'

const host = 'localhost:3000'

@Injectable({
    providedIn: 'root',
})
export class IframeCommunicationService {
    performOperation = (mySecretKey?: string): Promise<string> => {
        const iframe = window.document.getElementsByTagName('iframe')[0]
        const origin = `${window.location.protocol}//${host}`
        const data = {
            mySecretKey: mySecretKey || '',
        }
        iframe.contentWindow.postMessage(data, origin)

        if (!mySecretKey) {
            const newMessage$ = fromEvent(window, 'message').pipe(map(this.receiveMessage))
            return new Promise((resolve) => {
                const newMessageSubscriber = newMessage$.subscribe(
                    (encryptedSecretKey: string) => {
                        newMessageSubscriber.unsubscribe()

                        return encryptedSecretKey ? resolve(encryptedSecretKey) : this.performOperation()
                    },
                )
            })
        }

        return Promise.resolve('')
    }

    // eslint-disable-next-line class-methods-use-this
    receiveMessage = (messageEvent: MessageEvent): string => {
        const origin = `${window.location.protocol}//${host}`
        if (messageEvent.origin === origin) {
            if (messageEvent.data && messageEvent.data.mySecretKey) {
                return messageEvent.data.mySecretKey
            }
        }

        return undefined
    }
}
