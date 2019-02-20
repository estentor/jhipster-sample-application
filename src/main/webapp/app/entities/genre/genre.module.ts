import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { JHipsterAppSharedModule } from 'app/shared';
import {
    GenreComponent,
    GenreDetailComponent,
    GenreUpdateComponent,
    GenreDeletePopupComponent,
    GenreDeleteDialogComponent,
    genreRoute,
    genrePopupRoute
} from './';

const ENTITY_STATES = [...genreRoute, ...genrePopupRoute];

@NgModule({
    imports: [JHipsterAppSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [GenreComponent, GenreDetailComponent, GenreUpdateComponent, GenreDeleteDialogComponent, GenreDeletePopupComponent],
    entryComponents: [GenreComponent, GenreUpdateComponent, GenreDeleteDialogComponent, GenreDeletePopupComponent],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JHipsterAppGenreModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
