import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { JHipsterAppSharedModule } from 'app/shared';
import {
    PersonsComponent,
    PersonsDetailComponent,
    PersonsUpdateComponent,
    PersonsDeletePopupComponent,
    PersonsDeleteDialogComponent,
    personsRoute,
    personsPopupRoute
} from './';

const ENTITY_STATES = [...personsRoute, ...personsPopupRoute];

@NgModule({
    imports: [JHipsterAppSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        PersonsComponent,
        PersonsDetailComponent,
        PersonsUpdateComponent,
        PersonsDeleteDialogComponent,
        PersonsDeletePopupComponent
    ],
    entryComponents: [PersonsComponent, PersonsUpdateComponent, PersonsDeleteDialogComponent, PersonsDeletePopupComponent],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JHipsterAppPersonsModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
