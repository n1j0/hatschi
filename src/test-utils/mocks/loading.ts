// eslint-disable-next-line import/no-extraneous-dependencies
import { createSpyObj } from 'jest-createspyobj'

export class LoadingMock {
    static instance(): unknown {
        const loadingSpy = createSpyObj('Loading', [ 'present', 'dismiss' ])
        jest.spyOn(loadingSpy, 'present').mockReturnValue(Promise.resolve())
        jest.spyOn(loadingSpy, 'dismiss').mockReturnValue(Promise.resolve(true))
        return loadingSpy
    }
}
