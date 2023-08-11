import { TestBed } from '@angular/core/testing'

import { SecureStorageEcho, SecureStorageEchoObject } from '@ionic-native/secure-storage-echo/ngx'
import { IonicStorageModule } from '@ionic/storage'
import { AlertController, Platform } from '@ionic/angular'
import { StorageService } from './storage.service'
import { AlertControllerMock } from '../../test-utils/mocks/alertController'

describe('StorageService', () => {
    let service: StorageService

    const platformStub: Partial<Platform> = {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        is(platformName): boolean {
            return platformName === 'cordova'
        },
        ready: () => Promise.resolve('cordova'),
    }

    const secureStorageEchoObjectStub: Partial<SecureStorageEchoObject> = {
        secureDevice: () => Promise.resolve(),
        set: (key, value) => Promise.resolve(),
        get: key => Promise.resolve(key),
    }

    const secureStorageEchoStub: Partial<SecureStorageEcho> = {
        create: (store, options?) => Promise.resolve(new SecureStorageEchoObject('hatschi')),
    }

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                IonicStorageModule.forRoot(),
            ],
            providers: [
                {
                    provide: SecureStorageEcho,
                    useValue: secureStorageEchoStub,
                },
                {
                    provide: SecureStorageEchoObject,
                    useValue: secureStorageEchoObjectStub,
                },
                {
                    provide: Platform,
                    useValue: platformStub,
                },
                {
                    provide: AlertController,
                    useFactory: () => AlertControllerMock.instance(),
                },
            ],
        })
        service = TestBed.inject(StorageService)
        jest.spyOn(service, 'init')
    })

    it('should be created', () => {
        expect(service).toBeTruthy()
    })

    it('should check if the storage is being used in the web', () => {
        expect(service.isWeb()).toBeFalsy()
    })

    it('should check if security alert will be created', async () => {
        const alert = await service.createSecurityAlert()
        expect(alert).toBeTruthy()
    })

    it('should initialize the storage', async () => {
        await service.init()
        expect(service.secureStorage).toBeDefined()
        expect(service.isSecureStorageReady).toBeTruthy()
    })

    it('should not initialize the storage in web', async () => {
        service.isWeb = () => true
        expect(await service.init()).toBeUndefined()
    })

    it('should return data from storage', async () => {
        service.isSecureStorageReady = true
        service.secureStorage = <SecureStorageEchoObject>secureStorageEchoObjectStub
        const result = await service.getData('test')
        expect(result).toBeDefined()
    })

    it('should not return data from storage in web', async () => {
        service.isWeb = () => true
        expect(await service.getData('test')).toBeUndefined()
    })

    it('should not return data from storage when storage is not ready', async () => {
        service.isSecureStorageReady = false
        expect(await service.getData('test')).toBeUndefined()
    })

    it('should set the store data', async () => {
        service.isSecureStorageReady = true
        service.secureStorage = <SecureStorageEchoObject>secureStorageEchoObjectStub
        const result = await service.setStoreData({
            secretKey: 'secret',
            hatschiID: 'abcdefgh',
            uuid: '1234',
        })
        expect(Array.isArray(result)).toBeTruthy()
    })

    it('should not set the store data in web', async () => {
        service.isWeb = () => true
        expect(await service.setStoreData({
            secretKey: 'secret',
            hatschiID: 'abcdefgh',
            uuid: '1234',
        })).toBeUndefined()
    })

    it('should not set the store data when storage is not ready', async () => {
        service.isSecureStorageReady = false
        expect(await service.setStoreData({
            secretKey: 'secret',
            hatschiID: 'abcdefgh',
            uuid: '1234',
        })).toBeUndefined()
    })

    it('should set the username', async () => {
        service.isSecureStorageReady = true
        service.secureStorage = <SecureStorageEchoObject>secureStorageEchoObjectStub
        const result = await service.setUsername('12345678', 'newName')
        expect(result).toBe('newName')
    })

    it('should return the username', async () => {
        service.isSecureStorageReady = true
        service.secureStorage = <SecureStorageEchoObject>secureStorageEchoObjectStub
        const result = await service.getUsername('12345678')
        expect(result).toBe('newName')
    })

    it('should return the hatschi id in the app', async () => {
        service.isSecureStorageReady = true
        service.secureStorage = <SecureStorageEchoObject>secureStorageEchoObjectStub
        await service.setStoreData({
            secretKey: 'secret',
            hatschiID: 'abcdefgh',
            uuid: '1234',
        })
        const result = await service.getHatschiID()
        expect(result).toBe('abcdefgh')
    })

    it('should return the hatschi id in web', async () => {
        Object.defineProperty(global.self, 'sessionStorage', {
            value: {
                getItem: key => 'abcdefgh',
            },
        })
        service.isSecureStorageReady = true
        service.secureStorage = <SecureStorageEchoObject>secureStorageEchoObjectStub
        await service.setStoreData({
            secretKey: 'secret',
            hatschiID: 'abcdefgh',
            uuid: '1234',
        })
        service.isWeb = () => true
        const result = await service.getHatschiID()
        expect(result).toBe('abcdefgh')
    })

    it('should return the secret key', async () => {
        service.isSecureStorageReady = true
        service.secureStorage = <SecureStorageEchoObject>secureStorageEchoObjectStub
        await service.setStoreData({
            secretKey: 'secret',
            hatschiID: 'abcdefgh',
            uuid: '1234',
        })
        const result = await service.getSecretKey()
        expect(result).toBe('secretKey')
    })

    it('should not return the secret key in web', async () => {
        service.isWeb = () => true
        expect(await service.getSecretKey()).toBeUndefined()
    })

    it('should return the uuid', async () => {
        service.isSecureStorageReady = true
        service.secureStorage = <SecureStorageEchoObject>secureStorageEchoObjectStub
        await service.setStoreData({
            secretKey: 'secret',
            hatschiID: 'abcdefgh',
            uuid: '1234',
        })
        const result = await service.getUuid()
        expect(result).toBe('uuid')
    })

    it('should not return the uuid in web', async () => {
        service.isWeb = () => true
        expect(await service.getUuid()).toBeUndefined()
    })
})
