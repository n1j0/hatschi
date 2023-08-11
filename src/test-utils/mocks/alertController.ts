/* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable-next-line import/no-extraneous-dependencies
import { createSpyObj } from 'jest-createspyobj'
import { AlertMock } from './alert'

export class AlertControllerMock {
    static instance(): any {
        const alertCtrlSpy = createSpyObj('AlertController', [ 'create' ])
        jest.spyOn(alertCtrlSpy, 'create').mockReturnValue(Promise.resolve(AlertMock.instance()))

        return alertCtrlSpy
    }
}
