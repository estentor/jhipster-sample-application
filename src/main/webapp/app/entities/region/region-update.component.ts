import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IRegion } from 'app/shared/model/region.model';
import { RegionService } from './region.service';
import { IPersons } from 'app/shared/model/persons.model';
import { PersonsService } from 'app/entities/persons';

@Component({
    selector: 'jhi-region-update',
    templateUrl: './region-update.component.html'
})
export class RegionUpdateComponent implements OnInit {
    region: IRegion;
    isSaving: boolean;

    persons: IPersons[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected regionService: RegionService,
        protected personsService: PersonsService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ region }) => {
            this.region = region;
        });
        this.personsService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IPersons[]>) => mayBeOk.ok),
                map((response: HttpResponse<IPersons[]>) => response.body)
            )
            .subscribe((res: IPersons[]) => (this.persons = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.region.id !== undefined) {
            this.subscribeToSaveResponse(this.regionService.update(this.region));
        } else {
            this.subscribeToSaveResponse(this.regionService.create(this.region));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IRegion>>) {
        result.subscribe((res: HttpResponse<IRegion>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackPersonsById(index: number, item: IPersons) {
        return item.id;
    }
}
