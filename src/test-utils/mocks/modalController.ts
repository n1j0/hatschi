/* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable-next-line import/no-extraneous-dependencies
import { createSpyObj } from 'jest-createspyobj'
import { ModalMock } from './modal'

export class ModalControllerMock {
    static instance(): any {
        const modalCtrlSpy = createSpyObj('ModalController', [ 'create' ])
        jest.spyOn(modalCtrlSpy, 'create').mockReturnValue(Promise.resolve(ModalMock.instance()))

        return modalCtrlSpy
    }
}
