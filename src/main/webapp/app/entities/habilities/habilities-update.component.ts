import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { IHabilities } from 'app/shared/model/habilities.model';
import { HabilitiesService } from './habilities.service';

@Component({
    selector: 'jhi-habilities-update',
    templateUrl: './habilities-update.component.html'
})
export class HabilitiesUpdateComponent implements OnInit {
    habilities: IHabilities;
    isSaving: boolean;

    constructor(protected habilitiesService: HabilitiesService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ habilities }) => {
            this.habilities = habilities;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.habilities.id !== undefined) {
            this.subscribeToSaveResponse(this.habilitiesService.update(this.habilities));
        } else {
            this.subscribeToSaveResponse(this.habilitiesService.create(this.habilities));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IHabilities>>) {
        result.subscribe((res: HttpResponse<IHabilities>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
