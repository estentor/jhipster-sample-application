import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'region',
                loadChildren: './region/region.module#JHipsterAppRegionModule'
            },
            {
                path: 'country',
                loadChildren: './country/country.module#JHipsterAppCountryModule'
            },
            {
                path: 'location',
                loadChildren: './location/location.module#JHipsterAppLocationModule'
            },
            {
                path: 'habilities',
                loadChildren: './habilities/habilities.module#JHipsterAppHabilitiesModule'
            },
            {
                path: 'persons',
                loadChildren: './persons/persons.module#JHipsterAppPersonsModule'
            },
            {
                path: 'document-type',
                loadChildren: './document-type/document-type.module#JHipsterAppDocumentTypeModule'
            },
            {
                path: 'genre',
                loadChildren: './genre/genre.module#JHipsterAppGenreModule'
            }
            /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
        ])
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JHipsterAppEntityModule {}
