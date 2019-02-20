import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IDocumentType } from 'app/shared/model/document-type.model';
import { DocumentTypeService } from './document-type.service';
import { IPersons } from 'app/shared/model/persons.model';
import { PersonsService } from 'app/entities/persons';

@Component({
    selector: 'jhi-document-type-update',
    templateUrl: './document-type-update.component.html'
})
export class DocumentTypeUpdateComponent implements OnInit {
    documentType: IDocumentType;
    isSaving: boolean;

    persons: IPersons[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected documentTypeService: DocumentTypeService,
        protected personsService: PersonsService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ documentType }) => {
            this.documentType = documentType;
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
        if (this.documentType.id !== undefined) {
            this.subscribeToSaveResponse(this.documentTypeService.update(this.documentType));
        } else {
            this.subscribeToSaveResponse(this.documentTypeService.create(this.documentType));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IDocumentType>>) {
        result.subscribe((res: HttpResponse<IDocumentType>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
