/* eslint-disable */
let cryptoBox = null

function initCryptoBox(mySecretKey) {
    cryptoBox = function () {
        const randomValues = window.crypto.getRandomValues(new Uint8Array(64 / 2))
        const passphrase = Array.from(randomValues, i => i.toString(36).padStart(2, '0')).join('')
        let key = null
        window.crypto.subtle.importKey('raw', new TextEncoder().encode(passphrase), { name: 'PBKDF2' }, false, [ 'deriveKey' ]).then(passwordKey => window.crypto.subtle.deriveKey({
            name: 'PBKDF2',
            salt: window.crypto.getRandomValues(new Uint8Array(16)),
            iterations: 100000,
            hash: 'SHA-512',
        }, passwordKey, { name: 'AES-GCM', length: 256 }, true, [ 'encrypt', 'decrypt' ])).then(cryptoKey => {
            key = cryptoKey
            cryptoBox.encrypt(mySecretKey).then(encryptedData => {
                sessionStorage.setItem('mySecretKey', encryptedData)
            })
        }, error => {
            console.error(`Failed to load CryptoKey: ${error}`)
        })
        return {
            encrypt(data) {
                const iv = window.crypto.getRandomValues(new Uint8Array(16))
                const encodedText = new TextEncoder().encode(data)
                return window.crypto.subtle.encrypt({
                    name: 'AES-GCM',
                    iv,
                }, key, encodedText).then(encryptedData => `${window.base64js.fromByteArray(iv)}.${window.base64js.fromByteArray(new Uint8Array(encryptedData))}`, error => {
                    throw error
                })
            }, decrypt: data => {
                const iv = window.base64js.toByteArray(data.split('.')[0])
                const encryptedBytes = window.base64js.toByteArray(data.split('.')[1])
                return window.crypto.subtle.decrypt({
                    name: 'AES-GCM',
                    iv,
                }, key, encryptedBytes).then(decryptedData => new TextDecoder('utf-8').decode(new Uint8Array(decryptedData)), error => {
                    throw error
                })
            },
        }
    }()
}

function receiveMessage(messageEvent) {
    const origin = `${window.location.protocol}//localhost:3000`
    if (messageEvent.origin === origin) {
        if (cryptoBox === null) {
            initCryptoBox(messageEvent.data.mySecretKey)
        } else {
            const encryptedSecret = sessionStorage.getItem('mySecretKey')
            if (encryptedSecret !== null) {
                cryptoBox.decrypt(encryptedSecret).then(mySecretKey => {
                    messageEvent.source.postMessage({ mySecretKey }, messageEvent.origin)
                })
            }
        }
    }
}

window.addEventListener('message', receiveMessage)
