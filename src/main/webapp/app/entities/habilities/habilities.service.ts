import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IHabilities } from 'app/shared/model/habilities.model';

type EntityResponseType = HttpResponse<IHabilities>;
type EntityArrayResponseType = HttpResponse<IHabilities[]>;

@Injectable({ providedIn: 'root' })
export class HabilitiesService {
    public resourceUrl = SERVER_API_URL + 'api/habilities';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/habilities';

    constructor(protected http: HttpClient) {}

    create(habilities: IHabilities): Observable<EntityResponseType> {
        return this.http.post<IHabilities>(this.resourceUrl, habilities, { observe: 'response' });
    }

    update(habilities: IHabilities): Observable<EntityResponseType> {
        return this.http.put<IHabilities>(this.resourceUrl, habilities, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IHabilities>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IHabilities[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IHabilities[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
