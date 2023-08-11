import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing'
import { IonicModule } from '@ionic/angular'

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { NewChatPage } from './new-chat.page'

describe('NewChatPage', () => {
    let component: NewChatPage
    let fixture: ComponentFixture<NewChatPage>

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [ NewChatPage ],
            imports: [ IonicModule.forRoot() ],
            schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
        }).compileComponents()

        fixture = TestBed.createComponent(NewChatPage)
        component = fixture.componentInstance
        fixture.detectChanges()
    }))

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
