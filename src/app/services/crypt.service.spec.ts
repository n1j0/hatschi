import { TestBed } from '@angular/core/testing'

import { CryptService } from './crypt.service'

describe('CryptService', () => {
    let service: CryptService
    const secretKeyA = '1G2Q22ufoV7LtWT10OXz9KRi5iPyB3RuehYtRdABvfI='
    const publicKeyA = 'me09sMN/TK34C+sQybdoeYeo9UtD3Gd7kuZUechAQ0E='
    const secretKeyB = 'ZYF4Qpf1jBL7Wol6FrwSWZrkPytcgtw+DRZSNIuCX0A='
    const publicKeyB = 'rXY7iemAYHKeA2NV8+Ink4XYKPg/kfydiSd/vVwuW1k='
    const messageFromAToB = 'eLELDZ6ALlMuQ7a2TcXoS1afqiVGfo0RjZKI74byzblXOPFtLT+iffyYAqpS' // means hello

    beforeEach(() => {
        TestBed.configureTestingModule({})
        service = TestBed.inject(CryptService)
    })

    it('should be created', () => {
        expect(service).toBeTruthy()
    })

    it('should generate key pair', () => {
        const keyPair = service.generateKeyPair()
        expect(typeof keyPair.publicKey).toBe('string')
        expect(typeof keyPair.secretKey).toBe('string')
    })

    it('should encrypt a message', () => {
        const message = service.encryptMessage('hello', secretKeyA, publicKeyB)
        expect(typeof message).toBe('string')
    })

    it('should decrypt a message', () => {
        const message = service.decryptMessage(messageFromAToB, secretKeyB, publicKeyA)
        expect(typeof message).toBe('string')
    })

    it('should throw an error when message cannot be decrypted', () => {
        expect(() => service.decryptMessage('hdgfh', secretKeyB, publicKeyA)).toThrow()
    })

    it('should generate a derive key for encryption', async () => {
        const deriveKey = await service.generateDeriveKey('password')
        expect(deriveKey.key.algorithm).toEqual({
            name: 'AES-GCM',
            length: 256,
        })
        expect(deriveKey.key.extractable).toBeTruthy()
        expect(deriveKey.key.type).toBe('secret')
        expect(deriveKey.key.usages).toEqual([
            'encrypt',
            'decrypt',
        ])
        expect(deriveKey.salt).not.toBe('')
    })

    it('should generate a derive key for decryption', async () => {
        const salt = 'OiPGOyjU/RBRb84CKnJFuEwzLRh/MwoeJjk1+hqw5SDcm561BGrf1qg8PpyTDZz02KBsc6Gf4PwJ2gnyrmIO6p1lFPurl2vySOsD6lWd0ZtacGOd42t0mg6dkpj5MvKuPG4/ucenS3EHNOGIZhIgqThCl7dSt6itiBVNfacUFEM='
        const deriveKey = await service.generateDeriveKey('password', salt)
        expect(deriveKey.key.algorithm).toEqual({
            name: 'AES-GCM',
            length: 256,
        })
        expect(deriveKey.key.extractable).toBeTruthy()
        expect(deriveKey.key.type).toBe('secret')
        expect(deriveKey.key.usages).toEqual([
            'encrypt',
            'decrypt',
        ])
        expect(deriveKey.salt).toBe('')
    })

    it('should encrypt hatschi identity', async () => {
        const encrypted = await service.encryptHatschiIdentity('12345678', secretKeyA, 'accessToken', 'password')
        expect(typeof encrypted.identity).toBe('string')
        expect(typeof encrypted.salt).toBe('string')
        expect(typeof encrypted.iv).toBe('string')
    })

    it('should decrypt hatschi identity', async () => {
        // these values have been generated with the parameters of the test case "should encrypt hatschi identity"
        const decrypted = await service.decryptHatschiIdentity(
            'xKeik9CdhJbrDr5E4pCMYyBKNaYeh9oYeeBClhHyYhj4E6aV9hh3ZlHHiW9ADNIicSvMu5TmsMYL0u5zmJQxXfaLUN8N5O4qcU0P0w4edvEc2QKbiIJqF7qTZliHcKIoNl3wOOGOQb+dF5c+nVnYXk2JLEbm6gQmo4AawBcLx1gvByE=',
            'AMO/ePFZxP3YeUHCxZrdmPs1bRucyz2uvAn/Blg+hkI60Tb8a9TQIc+JGg82ud1HxLcc4CQcR1ERXWx2OYpCUOm/Htcz3M56Q8CcOuhtTxDgHcir6O8ZxSUme45GWscfaq30ioHrmSCvYUzQtbTSODnrHcE3PlHisEzYQjDiP6A=',
            'VDkuYb4TqgdifASxmPqVAQ==',
            'password',
        )
        expect(decrypted.myHatschiID).toBe('12345678')
        expect(decrypted.mySecretKey).toBe(secretKeyA)
        expect(decrypted.accessToken).toBe('accessToken')
    })

    // this test fails because the global crypto mock does not have the same error handling as the window.crypto object
    // looking forward for a better mock out there or implementing an own
    test.skip('should throw an error when hatschi identity cannot be decrypted', () => {
        // these values have been generated with the parameters of the test case "should encrypt hatschi identity"
        // but the password is wrong
        expect(() => service.decryptHatschiIdentity(
            'xKeik9CdhJbrDr5E4pCMYyBKNaYeh9oYeeBClhHyYhj4E6aV9hh3ZlHHiW9ADNIicSvMu5TmsMYL0u5zmJQxXfaLUN8N5O4qcU0P0w4edvEc2QKbiIJqF7qTZliHcKIoNl3wOOGOQb+dF5c+nVnYXk2JLEbm6gQmo4AawBcLx1gvByE=',
            'AMO/ePFZxP3YeUHCxZrdmPs1bRucyz2uvAn/Blg+hkI60Tb8a9TQIc+JGg82ud1HxLcc4CQcR1ERXWx2OYpCUOm/Htcz3M56Q8CcOuhtTxDgHcir6O8ZxSUme45GWscfaq30ioHrmSCvYUzQtbTSODnrHcE3PlHisEzYQjDiP6A=',
            'VDkuYb4TqgdifASxmPqVAQ==',
            'ffdgs',
        )).toThrow()
    })
})
