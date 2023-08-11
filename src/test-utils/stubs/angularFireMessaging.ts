import { Observable } from 'rxjs'

export const angularFireMessagingStub = {
    requestToken: () => new Observable(),
    messages: () => new Observable(),
}
