/* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable-next-line import/no-extraneous-dependencies
import { createSpyObj } from 'jest-createspyobj'

export class ToastMock {
    static instance(): any {
        const toastSpy = createSpyObj('Toast', [ 'present', 'dismiss', 'onDidDismiss' ])
        jest.spyOn(toastSpy, 'present').mockReturnValue(Promise.resolve())
        jest.spyOn(toastSpy, 'dismiss').mockReturnValue(Promise.resolve(true))

        return toastSpy
    }
}
