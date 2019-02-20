import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IDocumentType } from 'app/shared/model/document-type.model';
import { AccountService } from 'app/core';
import { DocumentTypeService } from './document-type.service';

@Component({
    selector: 'jhi-document-type',
    templateUrl: './document-type.component.html'
})
export class DocumentTypeComponent implements OnInit, OnDestroy {
    documentTypes: IDocumentType[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        protected documentTypeService: DocumentTypeService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected activatedRoute: ActivatedRoute,
        protected accountService: AccountService
    ) {
        this.currentSearch =
            this.activatedRoute.snapshot && this.activatedRoute.snapshot.params['search']
                ? this.activatedRoute.snapshot.params['search']
                : '';
    }

    loadAll() {
        if (this.currentSearch) {
            this.documentTypeService
                .search({
                    query: this.currentSearch
                })
                .pipe(
                    filter((res: HttpResponse<IDocumentType[]>) => res.ok),
                    map((res: HttpResponse<IDocumentType[]>) => res.body)
                )
                .subscribe((res: IDocumentType[]) => (this.documentTypes = res), (res: HttpErrorResponse) => this.onError(res.message));
            return;
        }
        this.documentTypeService
            .query()
            .pipe(
                filter((res: HttpResponse<IDocumentType[]>) => res.ok),
                map((res: HttpResponse<IDocumentType[]>) => res.body)
            )
            .subscribe(
                (res: IDocumentType[]) => {
                    this.documentTypes = res;
                    this.currentSearch = '';
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    search(query) {
        if (!query) {
            return this.clear();
        }
        this.currentSearch = query;
        this.loadAll();
    }

    clear() {
        this.currentSearch = '';
        this.loadAll();
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInDocumentTypes();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IDocumentType) {
        return item.id;
    }

    registerChangeInDocumentTypes() {
        this.eventSubscriber = this.eventManager.subscribe('documentTypeListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
