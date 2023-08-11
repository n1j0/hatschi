// eslint-disable-next-line import/no-extraneous-dependencies
import { createSpyObj } from 'jest-createspyobj'

export class StatusBarMock {
    static instance(): unknown {
        const statusBarSpy: unknown = createSpyObj('StatusBar', [
            'overlaysWebView',
            'styleDefault',
            'styleLightContent',
            'styleBlackTranslucent',
            'styleBlackOpaque',
            'backgroundColorByName',
            'backgroundColorByHexString',
            'hide',
            'show',
        ])

        // eslint-disable-next-line dot-notation
        statusBarSpy['isVisible'] = true

        return statusBarSpy
    }
}
