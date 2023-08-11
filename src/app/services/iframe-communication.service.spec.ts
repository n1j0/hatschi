import { TestBed } from '@angular/core/testing'

import { IframeCommunicationService } from './iframe-communication.service'

describe('IframeCommunicationService', () => {
    let service: IframeCommunicationService

    beforeEach(() => {
        delete window.location
        /* eslint-disable @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars */
        window.location = {
            ancestorOrigins: undefined,
            assign(url: string): void {},
            hash: '',
            host: 'localhost:3000',
            hostname: '',
            href: '',
            origin: '',
            pathname: '',
            port: '3000',
            protocol: 'https:',
            replace(url: string): void {},
            search: '',
            toString(): string {
                return ''
            },
            reload(forcedReload?: boolean): void {},
        }
        /* eslint-enable */
        document.body.innerHTML = '<iframe></iframe>'

        TestBed.configureTestingModule({})
        service = TestBed.inject(IframeCommunicationService)
    })

    it('should be created', () => {
        expect(service).toBeTruthy()
    })

    it('should return the secretKey', () => {
        expect(service.receiveMessage(new MessageEvent('unknown', {
            origin: 'https://localhost:3000',
            data: {
                mySecretKey: 'secretKey',
            },
        }))).toBe('secretKey')
    })

    it('should return undefined because origin is not the same or secretKey is missing', () => {
        expect(service.receiveMessage(new MessageEvent('unknown', {
            origin: 'https://test:1234',
            data: {
                mySecretKey: 'secretKey',
            },
        }))).toBe(undefined)
        expect(service.receiveMessage(new MessageEvent('unknown', {
            origin: 'https://localhost:3000',
            data: {},
        }))).toBe(undefined)
    })

    it('should send the secretKey to the iframe', async () => {
        expect(await service.performOperation('secretKey')).toBe('')
    })

    test.skip('should trigger the process to get the secretKey', async () => {
        service.receiveMessage = jest.fn().mockReturnValue('secretKey')
        expect(await service.performOperation()).toBe('secretKey')
    })
})
