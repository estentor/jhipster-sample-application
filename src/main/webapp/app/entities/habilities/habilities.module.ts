import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { JHipsterAppSharedModule } from 'app/shared';
import {
    HabilitiesComponent,
    HabilitiesDetailComponent,
    HabilitiesUpdateComponent,
    HabilitiesDeletePopupComponent,
    HabilitiesDeleteDialogComponent,
    habilitiesRoute,
    habilitiesPopupRoute
} from './';

const ENTITY_STATES = [...habilitiesRoute, ...habilitiesPopupRoute];

@NgModule({
    imports: [JHipsterAppSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        HabilitiesComponent,
        HabilitiesDetailComponent,
        HabilitiesUpdateComponent,
        HabilitiesDeleteDialogComponent,
        HabilitiesDeletePopupComponent
    ],
    entryComponents: [HabilitiesComponent, HabilitiesUpdateComponent, HabilitiesDeleteDialogComponent, HabilitiesDeletePopupComponent],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JHipsterAppHabilitiesModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
