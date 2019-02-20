import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';
import { IPersons } from 'app/shared/model/persons.model';
import { PersonsService } from './persons.service';
import { IDocumentType } from 'app/shared/model/document-type.model';
import { DocumentTypeService } from 'app/entities/document-type';
import { IGenre } from 'app/shared/model/genre.model';
import { GenreService } from 'app/entities/genre';
import { ICountry } from 'app/shared/model/country.model';
import { CountryService } from 'app/entities/country';
import { IRegion } from 'app/shared/model/region.model';
import { RegionService } from 'app/entities/region';
import { ILocation } from 'app/shared/model/location.model';
import { LocationService } from 'app/entities/location';
import { IHabilities } from 'app/shared/model/habilities.model';
import { HabilitiesService } from 'app/entities/habilities';

@Component({
    selector: 'jhi-persons-update',
    templateUrl: './persons-update.component.html'
})
export class PersonsUpdateComponent implements OnInit {
    persons: IPersons;
    isSaving: boolean;

    documenttypes: IDocumentType[];

    genres: IGenre[];

    countries: ICountry[];

    regions: IRegion[];

    locations: ILocation[];

    habilities: IHabilities[];
    arrivalDateDp: any;

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected personsService: PersonsService,
        protected documentTypeService: DocumentTypeService,
        protected genreService: GenreService,
        protected countryService: CountryService,
        protected regionService: RegionService,
        protected locationService: LocationService,
        protected habilitiesService: HabilitiesService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ persons }) => {
            this.persons = persons;
        });
        this.documentTypeService
            .query({ filter: 'persons-is-null' })
            .pipe(
                filter((mayBeOk: HttpResponse<IDocumentType[]>) => mayBeOk.ok),
                map((response: HttpResponse<IDocumentType[]>) => response.body)
            )
            .subscribe(
                (res: IDocumentType[]) => {
                    if (!this.persons.documentType || !this.persons.documentType.id) {
                        this.documenttypes = res;
                    } else {
                        this.documentTypeService
                            .find(this.persons.documentType.id)
                            .pipe(
                                filter((subResMayBeOk: HttpResponse<IDocumentType>) => subResMayBeOk.ok),
                                map((subResponse: HttpResponse<IDocumentType>) => subResponse.body)
                            )
                            .subscribe(
                                (subRes: IDocumentType) => (this.documenttypes = [subRes].concat(res)),
                                (subRes: HttpErrorResponse) => this.onError(subRes.message)
                            );
                    }
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        this.genreService
            .query({ filter: 'persons-is-null' })
            .pipe(
                filter((mayBeOk: HttpResponse<IGenre[]>) => mayBeOk.ok),
                map((response: HttpResponse<IGenre[]>) => response.body)
            )
            .subscribe(
                (res: IGenre[]) => {
                    if (!this.persons.genre || !this.persons.genre.id) {
                        this.genres = res;
                    } else {
                        this.genreService
                            .find(this.persons.genre.id)
                            .pipe(
                                filter((subResMayBeOk: HttpResponse<IGenre>) => subResMayBeOk.ok),
                                map((subResponse: HttpResponse<IGenre>) => subResponse.body)
                            )
                            .subscribe(
                                (subRes: IGenre) => (this.genres = [subRes].concat(res)),
                                (subRes: HttpErrorResponse) => this.onError(subRes.message)
                            );
                    }
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        this.countryService
            .query({ filter: 'persons-is-null' })
            .pipe(
                filter((mayBeOk: HttpResponse<ICountry[]>) => mayBeOk.ok),
                map((response: HttpResponse<ICountry[]>) => response.body)
            )
            .subscribe(
                (res: ICountry[]) => {
                    if (!this.persons.country || !this.persons.country.id) {
                        this.countries = res;
                    } else {
                        this.countryService
                            .find(this.persons.country.id)
                            .pipe(
                                filter((subResMayBeOk: HttpResponse<ICountry>) => subResMayBeOk.ok),
                                map((subResponse: HttpResponse<ICountry>) => subResponse.body)
                            )
                            .subscribe(
                                (subRes: ICountry) => (this.countries = [subRes].concat(res)),
                                (subRes: HttpErrorResponse) => this.onError(subRes.message)
                            );
                    }
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        this.regionService
            .query({ filter: 'persons-is-null' })
            .pipe(
                filter((mayBeOk: HttpResponse<IRegion[]>) => mayBeOk.ok),
                map((response: HttpResponse<IRegion[]>) => response.body)
            )
            .subscribe(
                (res: IRegion[]) => {
                    if (!this.persons.region || !this.persons.region.id) {
                        this.regions = res;
                    } else {
                        this.regionService
                            .find(this.persons.region.id)
                            .pipe(
                                filter((subResMayBeOk: HttpResponse<IRegion>) => subResMayBeOk.ok),
                                map((subResponse: HttpResponse<IRegion>) => subResponse.body)
                            )
                            .subscribe(
                                (subRes: IRegion) => (this.regions = [subRes].concat(res)),
                                (subRes: HttpErrorResponse) => this.onError(subRes.message)
                            );
                    }
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        this.locationService
            .query({ filter: 'persons-is-null' })
            .pipe(
                filter((mayBeOk: HttpResponse<ILocation[]>) => mayBeOk.ok),
                map((response: HttpResponse<ILocation[]>) => response.body)
            )
            .subscribe(
                (res: ILocation[]) => {
                    if (!this.persons.location || !this.persons.location.id) {
                        this.locations = res;
                    } else {
                        this.locationService
                            .find(this.persons.location.id)
                            .pipe(
                                filter((subResMayBeOk: HttpResponse<ILocation>) => subResMayBeOk.ok),
                                map((subResponse: HttpResponse<ILocation>) => subResponse.body)
                            )
                            .subscribe(
                                (subRes: ILocation) => (this.locations = [subRes].concat(res)),
                                (subRes: HttpErrorResponse) => this.onError(subRes.message)
                            );
                    }
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        this.habilitiesService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IHabilities[]>) => mayBeOk.ok),
                map((response: HttpResponse<IHabilities[]>) => response.body)
            )
            .subscribe((res: IHabilities[]) => (this.habilities = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.persons.id !== undefined) {
            this.subscribeToSaveResponse(this.personsService.update(this.persons));
        } else {
            this.subscribeToSaveResponse(this.personsService.create(this.persons));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IPersons>>) {
        result.subscribe((res: HttpResponse<IPersons>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackDocumentTypeById(index: number, item: IDocumentType) {
        return item.id;
    }

    trackGenreById(index: number, item: IGenre) {
        return item.id;
    }

    trackCountryById(index: number, item: ICountry) {
        return item.id;
    }

    trackRegionById(index: number, item: IRegion) {
        return item.id;
    }

    trackLocationById(index: number, item: ILocation) {
        return item.id;
    }

    trackHabilitiesById(index: number, item: IHabilities) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
}
