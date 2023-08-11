import { Injectable } from '@angular/core'
import { LoadingController } from '@ionic/angular'

@Injectable({
    providedIn: 'root',
})
export class LoadingService {
    loading: HTMLIonLoadingElement

    // eslint-disable-next-line no-useless-constructor
    constructor(
        private loadingCtrl: LoadingController,
    ) {
    }

    async startLoading(message?: string): Promise<void> {
        if (!this.loading) {
            this.loading = await this.loadingCtrl.create({
                message: message ? `${message}...` : 'Please wait...',
                mode: 'ios',
                spinner: 'circular',
            })
        }
        await this.loading.present()
    }

    async stopLoading(): Promise<void> {
        await this.loading?.dismiss()
    }
}
