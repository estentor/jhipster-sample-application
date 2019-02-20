import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IGenre } from 'app/shared/model/genre.model';
import { AccountService } from 'app/core';
import { GenreService } from './genre.service';

@Component({
    selector: 'jhi-genre',
    templateUrl: './genre.component.html'
})
export class GenreComponent implements OnInit, OnDestroy {
    genres: IGenre[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        protected genreService: GenreService,
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
            this.genreService
                .search({
                    query: this.currentSearch
                })
                .pipe(
                    filter((res: HttpResponse<IGenre[]>) => res.ok),
                    map((res: HttpResponse<IGenre[]>) => res.body)
                )
                .subscribe((res: IGenre[]) => (this.genres = res), (res: HttpErrorResponse) => this.onError(res.message));
            return;
        }
        this.genreService
            .query()
            .pipe(
                filter((res: HttpResponse<IGenre[]>) => res.ok),
                map((res: HttpResponse<IGenre[]>) => res.body)
            )
            .subscribe(
                (res: IGenre[]) => {
                    this.genres = res;
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
        this.registerChangeInGenres();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IGenre) {
        return item.id;
    }

    registerChangeInGenres() {
        this.eventSubscriber = this.eventManager.subscribe('genreListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
