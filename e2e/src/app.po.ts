/* eslint-disable */
import { browser, by, element } from 'protractor'

export class AppPage {
    navigateTo = () => browser.get('/')

    getPageTitle = () => element(by.css('ion-title')).getText()
}
