import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import { database } from 'firebase-admin/lib/database'
import { v4 as uuidv4, v5 as uuidv5 } from 'uuid'
// eslint-disable-next-line no-unused-vars, no-undef
import HttpsError = functions.https.HttpsError
import Reference = database.Reference

admin.initializeApp()

// eslint-disable-next-line max-len, @typescript-eslint/no-explicit-any
export const generateHatschiIDAndAccessToken = functions.https.onCall(async (data: any): Promise<{ hatschiID: string; uuid: string, accessToken: string } | Error | HttpsError> => {
    if (!data.publicKey) {
        throw new functions.https.HttpsError('invalid-argument', 'The function must be called with one argument "publicKey" containing the public key to add.')
    }

    let hatschiID: string
    let hatschiIDAlreadyExists = false
    let databaseRef: Reference

    do {
        hatschiID = Math.random().toString(36).substr(2, 8)
        databaseRef = admin.database().ref(`users/${hatschiID}`)
        // eslint-disable-next-line no-await-in-loop, no-loop-func
        await databaseRef.once('value', (snapshot) => {
            hatschiIDAlreadyExists = snapshot.exists()
        })
    } while (hatschiIDAlreadyExists)

    let accessToken: string
    const uuid: string = uuidv5(hatschiID, uuidv4()).toString()

    try {
        await admin.database().ref(`hatschiIDs/${hatschiID}`).set(true)
        await admin.database().ref(`uuids/${uuid}`).set(hatschiID)
        accessToken = await admin.auth().createCustomToken(uuid)
        return databaseRef.set({ publicKey: data.publicKey, uuid })
            .then(() => ({
                hatschiID,
                uuid,
                accessToken,
            }))
            .catch((error): HttpsError => {
                throw new functions.https.HttpsError(error.code, error.message)
            })
    } catch (error) {
        return new functions.https.HttpsError('unknown', error.message)
    }
})

// eslint-disable-next-line max-len, @typescript-eslint/no-explicit-any
export const getAccessTokenForWeb = functions.https.onCall(async (data: any): Promise<string | Error | HttpsError> => {
    if (!data.uuid) {
        throw new functions.https.HttpsError('invalid-argument', 'The function must be called with one argument "uuid" containing the uuid to create access token.')
    }

    return admin.auth().createCustomToken(data.uuid)
        .then(accessToken => accessToken)
        .catch((error) => {
            throw new functions.https.HttpsError('unknown', error.message)
        })
})

export const sendNotification = functions.database.ref('/messages/{chatID}/{messageID}')
    .onCreate(async (snapshot, context) => {
        const snapshotValue = snapshot.val()
        if (typeof snapshotValue !== 'boolean') {
            const { chatID } = context.params
            const receiverID = chatID.replace(snapshotValue.sender, '')
            if (receiverID === snapshotValue.sender) {
                return Promise.resolve()
            }
            const receiverTokensSnapshot = (await admin.database().ref(`users/${receiverID}/fcmTokens`).once('value'))
            const receiverTokens = Object.keys(receiverTokensSnapshot.val())
            const promiseResult: admin.messaging.MessagingDevicesResponse = await admin.messaging().sendToDevice(
                receiverTokens, {
                    notification: {
                        title: 'New message',
                        body: `from ${snapshotValue.sender}`,
                    },
                },
            )
            const deleteTokens = promiseResult.results.map(async (result, index) => {
                const { error } = result
                if (error
                    && (
                        error.code === 'messaging/invalid-registration-token'
                        || error.code === 'messaging/registration-token-not-registered'
                    )
                ) {
                    await admin.database().ref(`users/${receiverID}/fcmTokens/${receiverTokens[index]}`).remove()
                }
            })
            return Promise.all(deleteTokens)
        }
        return Promise.resolve()
    })
