/* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable-next-line import/no-extraneous-dependencies
import { createSpyObj } from 'jest-createspyobj'
import { ToastMock } from './toast'

export class ToastControllerMock {
    static instance(): any {
        const toastCtrlSpy = createSpyObj('ToastController', [ 'create' ])
        jest.spyOn(toastCtrlSpy, 'create').mockReturnValue(Promise.resolve(ToastMock.instance()))

        return toastCtrlSpy
    }
}
