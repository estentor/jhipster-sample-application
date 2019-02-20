import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Persons } from 'app/shared/model/persons.model';
import { PersonsService } from './persons.service';
import { PersonsComponent } from './persons.component';
import { PersonsDetailComponent } from './persons-detail.component';
import { PersonsUpdateComponent } from './persons-update.component';
import { PersonsDeletePopupComponent } from './persons-delete-dialog.component';
import { IPersons } from 'app/shared/model/persons.model';

@Injectable({ providedIn: 'root' })
export class PersonsResolve implements Resolve<IPersons> {
    constructor(private service: PersonsService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IPersons> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Persons>) => response.ok),
                map((persons: HttpResponse<Persons>) => persons.body)
            );
        }
        return of(new Persons());
    }
}

export const personsRoute: Routes = [
    {
        path: '',
        component: PersonsComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'jHipsterApp.persons.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: PersonsDetailComponent,
        resolve: {
            persons: PersonsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jHipsterApp.persons.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: PersonsUpdateComponent,
        resolve: {
            persons: PersonsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jHipsterApp.persons.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: PersonsUpdateComponent,
        resolve: {
            persons: PersonsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jHipsterApp.persons.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const personsPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: PersonsDeletePopupComponent,
        resolve: {
            persons: PersonsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jHipsterApp.persons.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
