/* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable-next-line import/no-extraneous-dependencies
import { createSpyObj } from 'jest-createspyobj'

export class ModalMock {
    static instance(): any {
        const modalSpy = createSpyObj('Modal', [ 'present', 'dismiss', 'onDidDismiss' ])
        jest.spyOn(modalSpy, 'present').mockReturnValue(Promise.resolve())
        jest.spyOn(modalSpy, 'dismiss').mockReturnValue(Promise.resolve(true))

        return modalSpy
    }
}
