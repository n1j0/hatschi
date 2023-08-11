// eslint-disable-next-line import/no-extraneous-dependencies
import { createSpyObj } from 'jest-createspyobj'

export class SplashScreenMock {
    static instance(): unknown {
        return createSpyObj('SplashScreen', [ 'show', 'hide' ])
    }
}
