import { Injectable } from '@angular/core'
import { SecureStorageEcho, SecureStorageEchoObject } from '@ionic-native/secure-storage-echo/ngx'
import { AlertController, Platform } from '@ionic/angular'
import { Storage } from '@ionic/storage'

interface HatschiStorage {
    secretKey: string,
    hatschiID: string,
    uuid: string,
}

const STORAGE_NAME = 'hatschi'
const SECRET_KEY_STORAGE_NAME = 'secretKey'
const UUID_STORAGE_NAME = 'uuid'
export const HATSCHI_ID_STORAGE_NAME = 'myHatschiID'

@Injectable({
    providedIn: 'root',
})
export class StorageService {
    secureStorage: SecureStorageEchoObject

    isSecureStorageReady: boolean

    constructor(
        private alertController: AlertController,
        private platform: Platform,
        private secureStorageEcho: SecureStorageEcho,
        private storage: Storage,
    ) {
        this.isSecureStorageReady = false

        this.init()
    }

    isWeb(): boolean {
        return !this.platform.is('cordova')
    }

    createSecurityAlert(): Promise<HTMLIonAlertElement> {
        return this.alertController.create({
            header: 'Setup lock screen',
            subHeader: 'Please set up a lock screen',
            message: 'Unfortunately it is not possible to use this app without an activated lock screen.',
            buttons: [
                {
                    text: 'Set up now',
                    handler: () => {
                        new SecureStorageEchoObject(STORAGE_NAME).secureDevice()
                            .then(
                                async () => {
                                    await this.init()
                                },
                                async () => {
                                    await this.init()
                                },
                            )
                    },
                },
            ],
        })
    }

    async init(): Promise<void> {
        if (this.isWeb()) {
            return
        }

        await this.platform.ready()
        await this.secureStorageEcho.create(STORAGE_NAME)
            .then(
                (storage: SecureStorageEchoObject) => {
                    this.secureStorage = storage
                    this.isSecureStorageReady = true
                },
                async () => {
                    const alert = await this.createSecurityAlert()

                    await alert.present()
                },
            )
    }

    async getData(key: string): Promise<string> {
        if (this.isWeb()) {
            return undefined
        }

        if (!this.isSecureStorageReady) {
            return undefined
        }

        return this.secureStorage.get(key)
            .then((data: string) => data)
            .catch(() => undefined)
    }

    setStoreData(data: HatschiStorage): Promise<Promise<unknown>[]> {
        if (this.isWeb()) {
            return undefined
        }

        if (!this.isSecureStorageReady) {
            return undefined
        }

        return Promise.all([
            this.storage.set(HATSCHI_ID_STORAGE_NAME, data.hatschiID),
            this.secureStorage.set(UUID_STORAGE_NAME, data.uuid),
            this.secureStorage.set(SECRET_KEY_STORAGE_NAME, data.secretKey),
        ])
    }

    setUsername(theirHatschiID: string, name: string): Promise<void> {
        return this.storage.set(theirHatschiID, name)
    }

    async getUsername(theirHatschiID: string): Promise<string> {
        return await this.storage.get(theirHatschiID) || theirHatschiID
    }

    getHatschiID(): Promise<string> {
        if (this.isWeb()) {
            return Promise.resolve(sessionStorage.getItem(HATSCHI_ID_STORAGE_NAME))
        }

        return this.storage.get(HATSCHI_ID_STORAGE_NAME)
    }

    getSecretKey(): Promise<string> {
        if (this.isWeb()) {
            return undefined
        }

        return this.getData(SECRET_KEY_STORAGE_NAME)
    }

    getUuid(): Promise<string> {
        if (this.isWeb()) {
            return undefined
        }

        return this.getData(UUID_STORAGE_NAME)
    }
}
