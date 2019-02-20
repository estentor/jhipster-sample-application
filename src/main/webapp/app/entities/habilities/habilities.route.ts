import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Habilities } from 'app/shared/model/habilities.model';
import { HabilitiesService } from './habilities.service';
import { HabilitiesComponent } from './habilities.component';
import { HabilitiesDetailComponent } from './habilities-detail.component';
import { HabilitiesUpdateComponent } from './habilities-update.component';
import { HabilitiesDeletePopupComponent } from './habilities-delete-dialog.component';
import { IHabilities } from 'app/shared/model/habilities.model';

@Injectable({ providedIn: 'root' })
export class HabilitiesResolve implements Resolve<IHabilities> {
    constructor(private service: HabilitiesService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IHabilities> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Habilities>) => response.ok),
                map((habilities: HttpResponse<Habilities>) => habilities.body)
            );
        }
        return of(new Habilities());
    }
}

export const habilitiesRoute: Routes = [
    {
        path: '',
        component: HabilitiesComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'jHipsterApp.habilities.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: HabilitiesDetailComponent,
        resolve: {
            habilities: HabilitiesResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jHipsterApp.habilities.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: HabilitiesUpdateComponent,
        resolve: {
            habilities: HabilitiesResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jHipsterApp.habilities.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: HabilitiesUpdateComponent,
        resolve: {
            habilities: HabilitiesResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jHipsterApp.habilities.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const habilitiesPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: HabilitiesDeletePopupComponent,
        resolve: {
            habilities: HabilitiesResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jHipsterApp.habilities.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
