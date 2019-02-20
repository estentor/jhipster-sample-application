import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IGenre } from 'app/shared/model/genre.model';
import { GenreService } from './genre.service';
import { IPersons } from 'app/shared/model/persons.model';
import { PersonsService } from 'app/entities/persons';

@Component({
    selector: 'jhi-genre-update',
    templateUrl: './genre-update.component.html'
})
export class GenreUpdateComponent implements OnInit {
    genre: IGenre;
    isSaving: boolean;

    persons: IPersons[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected genreService: GenreService,
        protected personsService: PersonsService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ genre }) => {
            this.genre = genre;
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
        if (this.genre.id !== undefined) {
            this.subscribeToSaveResponse(this.genreService.update(this.genre));
        } else {
            this.subscribeToSaveResponse(this.genreService.create(this.genre));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IGenre>>) {
        result.subscribe((res: HttpResponse<IGenre>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
