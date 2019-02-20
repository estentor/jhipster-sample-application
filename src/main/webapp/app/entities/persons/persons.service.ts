import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IPersons } from 'app/shared/model/persons.model';

type EntityResponseType = HttpResponse<IPersons>;
type EntityArrayResponseType = HttpResponse<IPersons[]>;

@Injectable({ providedIn: 'root' })
export class PersonsService {
    public resourceUrl = SERVER_API_URL + 'api/persons';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/persons';

    constructor(protected http: HttpClient) {}

    create(persons: IPersons): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(persons);
        return this.http
            .post<IPersons>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(persons: IPersons): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(persons);
        return this.http
            .put<IPersons>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IPersons>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IPersons[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IPersons[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    protected convertDateFromClient(persons: IPersons): IPersons {
        const copy: IPersons = Object.assign({}, persons, {
            arrivalDate: persons.arrivalDate != null && persons.arrivalDate.isValid() ? persons.arrivalDate.format(DATE_FORMAT) : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.arrivalDate = res.body.arrivalDate != null ? moment(res.body.arrivalDate) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((persons: IPersons) => {
                persons.arrivalDate = persons.arrivalDate != null ? moment(persons.arrivalDate) : null;
            });
        }
        return res;
    }
}
