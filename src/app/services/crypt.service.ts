import { Injectable } from '@angular/core'
import { box, randomBytes } from 'tweetnacl'
import { decode as decodeUTF8, encode as encodeUTF8 } from '@stablelib/utf8'
import { decode as decodeBase64, encode as encodeBase64 } from '@stablelib/base64'

interface KeyPair {
    secretKey: string,
    publicKey: string,
}

interface DeriveKey {
    salt: string,
    key: CryptoKey,
}

interface EncryptedHatschiIdentityInformation {
    salt: string,
    identity: string,
    iv: string,
}

interface HatschiIdentity {
    myHatschiID: string,
    mySecretKey: string,
    accessToken: string,
}

@Injectable({
    providedIn: 'root',
})

export class CryptService {
    // eslint-disable-next-line class-methods-use-this
    generateKeyPair(): KeyPair {
        const { publicKey, secretKey } = box.keyPair()

        return {
            publicKey: encodeBase64(publicKey),
            secretKey: encodeBase64(secretKey),
        }
    }

    // eslint-disable-next-line class-methods-use-this
    encryptMessage(message: string, mySecretkey: string, theirPublicKey: string): string {
        const nonce: Uint8Array = randomBytes(box.nonceLength)
        const messageUint8 = encodeUTF8(message)
        const encrypted = box(messageUint8, nonce, decodeBase64(theirPublicKey), decodeBase64(mySecretkey))

        const fullMessage = new Uint8Array(nonce.length + encrypted.length)
        fullMessage.set(nonce)
        fullMessage.set(encrypted, nonce.length)

        return encodeBase64(fullMessage)
    }

    // eslint-disable-next-line class-methods-use-this
    decryptMessage(messageWithNonce: string, mySecretkey: string, theirPublicKey: string): string {
        const messageWithNonceUint8 = decodeBase64(messageWithNonce)
        const nonce = messageWithNonceUint8.slice(0, box.nonceLength)
        const message = messageWithNonceUint8.slice(box.nonceLength, messageWithNonce.length)

        const decrypted = box.open(message, nonce, decodeBase64(theirPublicKey), decodeBase64(mySecretkey))

        if (!decrypted) {
            throw new Error('Could not decrypt message')
        }

        return decodeUTF8(decrypted)
    }

    // eslint-disable-next-line max-len,class-methods-use-this
    async generateDeriveKey(passphrase: string, keySalt?: string): Promise<DeriveKey> {
        let salt: Uint8Array

        if (!keySalt) {
            salt = window.crypto.getRandomValues(new Uint8Array(128))
        }

        const cryptoKey: CryptoKey = await window.crypto.subtle.deriveKey(
            {
                name: 'PBKDF2',
                salt: salt || decodeBase64(keySalt),
                iterations: 100000,
                hash: 'SHA-512',
            },
            await window.crypto.subtle.importKey(
                'raw',
                new TextEncoder().encode(passphrase),
                'PBKDF2',
                false,
                [ 'deriveKey' ],
            ),
            { name: 'AES-GCM', length: 256 },
            true,
            [ 'encrypt', 'decrypt' ],
        )

        return {
            key: cryptoKey,
            salt: keySalt ? '' : encodeBase64(salt),
        }
    }

    // eslint-disable-next-line max-len
    async encryptHatschiIdentity(myHatschiID: string, mySecretKey: string, accessToken: string, passphrase: string): Promise<EncryptedHatschiIdentityInformation> {
        const json: HatschiIdentity = {
            myHatschiID,
            mySecretKey,
            accessToken,
        }
        const { key, salt } = await this.generateDeriveKey(passphrase)

        const iv = window.crypto.getRandomValues(new Uint8Array(16))
        const encrypted = await window.crypto.subtle.encrypt(
            {
                name: 'AES-GCM',
                iv,
            },
            key,
            encodeUTF8(JSON.stringify(json)),
        )

        return {
            identity: btoa(String.fromCharCode(...new Uint8Array(encrypted))),
            salt,
            iv: encodeBase64(iv),
        }
    }

    // eslint-disable-next-line max-len
    async decryptHatschiIdentity(encryptedIdentity: string, salt: string, iv: string, passphrase: string): Promise<HatschiIdentity> {
        const { key } = await this.generateDeriveKey(passphrase, salt)

        const decrypted = await window.crypto.subtle.decrypt(
            {
                name: 'AES-GCM',
                iv: decodeBase64(iv),
            },
            key,
            decodeBase64(encryptedIdentity),
        )

        if (!decrypted) {
            throw new Error('Could not decrypt identity')
        }

        return JSON.parse(decodeUTF8(new Uint8Array(decrypted)))
    }
}
