export const angularFireAuthStub = {
    onAuthStateChanged: () => Promise.resolve(),
    signInWithCustomToken: token => Promise.resolve(token),
    updateCurrentUser: () => Promise.resolve(),
    setPersistence: persistence => Promise.resolve(),
}
