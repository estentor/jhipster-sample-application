import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { JHipsterAppSharedModule } from 'app/shared';
import {
    DocumentTypeComponent,
    DocumentTypeDetailComponent,
    DocumentTypeUpdateComponent,
    DocumentTypeDeletePopupComponent,
    DocumentTypeDeleteDialogComponent,
    documentTypeRoute,
    documentTypePopupRoute
} from './';

const ENTITY_STATES = [...documentTypeRoute, ...documentTypePopupRoute];

@NgModule({
    imports: [JHipsterAppSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        DocumentTypeComponent,
        DocumentTypeDetailComponent,
        DocumentTypeUpdateComponent,
        DocumentTypeDeleteDialogComponent,
        DocumentTypeDeletePopupComponent
    ],
    entryComponents: [
        DocumentTypeComponent,
        DocumentTypeUpdateComponent,
        DocumentTypeDeleteDialogComponent,
        DocumentTypeDeletePopupComponent
    ],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JHipsterAppDocumentTypeModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
