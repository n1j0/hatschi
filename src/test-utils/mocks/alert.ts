/* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable-next-line import/no-extraneous-dependencies
import { createSpyObj } from 'jest-createspyobj'

export class AlertMock {
    static instance(): any {
        const alertSpy = createSpyObj('Alert', [ 'present', 'dismiss', 'onDidDismiss' ])
        jest.spyOn(alertSpy, 'present').mockReturnValue(Promise.resolve())
        jest.spyOn(alertSpy, 'dismiss').mockReturnValue(Promise.resolve(true))

        return alertSpy
    }
}
