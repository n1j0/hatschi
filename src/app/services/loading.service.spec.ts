import { TestBed } from '@angular/core/testing'

import { LoadingController } from '@ionic/angular'
import { LoadingService } from './loading.service'
import { LoadingControllerMock } from '../../test-utils/mocks/loadingController'

describe('LoadingService', () => {
    let service: LoadingService

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                {
                    provide: LoadingController,
                    useFactory: () => LoadingControllerMock.instance(),
                },
            ],
        })
        service = TestBed.inject(LoadingService)
    })

    it('should be created', () => {
        expect(service).toBeTruthy()
    })

    it('should start a spinner', async () => {
        await service.startLoading()
        expect(service.loading).toBeTruthy()
        expect(service.loading.present).toHaveBeenCalled()
    })

    it('should stop a spinner', async () => {
        await service.startLoading()
        await service.stopLoading()
        expect(service.loading.dismiss).toHaveBeenCalled()
    })
})
