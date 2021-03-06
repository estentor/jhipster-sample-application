import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IGenre } from 'app/shared/model/genre.model';

type EntityResponseType = HttpResponse<IGenre>;
type EntityArrayResponseType = HttpResponse<IGenre[]>;

@Injectable({ providedIn: 'root' })
export class GenreService {
    public resourceUrl = SERVER_API_URL + 'api/genres';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/genres';

    constructor(protected http: HttpClient) {}

    create(genre: IGenre): Observable<EntityResponseType> {
        return this.http.post<IGenre>(this.resourceUrl, genre, { observe: 'response' });
    }

    update(genre: IGenre): Observable<EntityResponseType> {
        return this.http.put<IGenre>(this.resourceUrl, genre, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IGenre>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IGenre[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IGenre[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
