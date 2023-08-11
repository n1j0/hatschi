import { AngularFireList, SnapshotAction } from '@angular/fire/database'
import { Observable } from 'rxjs'

export const angularFireDatabaseStub = {
    object: path => ({
        remove: () => Promise.resolve(),
        set: val => Promise.resolve(),
    }),
    database: () => ({
        ref: path => ({
            set: val => Promise.resolve(),
        }),
    }),
    list: () => <AngularFireList<unknown>><unknown>{
        snapshotChanges: (): Observable<SnapshotAction<unknown>> => new Observable<SnapshotAction<unknown>>(),
    },
}
