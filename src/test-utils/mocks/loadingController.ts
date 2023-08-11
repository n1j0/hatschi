// eslint-disable-next-line import/no-extraneous-dependencies
import { createSpyObj } from 'jest-createspyobj'
import { LoadingMock } from './loading'

export class LoadingControllerMock {
    static instance(): unknown {
        const loadingCtrlSpy = createSpyObj('LoadingController', [ 'create' ])
        jest.spyOn(loadingCtrlSpy, 'create').mockReturnValue(LoadingMock.instance())

        return loadingCtrlSpy
    }
}
