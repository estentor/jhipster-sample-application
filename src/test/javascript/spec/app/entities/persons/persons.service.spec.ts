/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { PersonsService } from 'app/entities/persons/persons.service';
import { IPersons, Persons } from 'app/shared/model/persons.model';

describe('Service Tests', () => {
    describe('Persons Service', () => {
        let injector: TestBed;
        let service: PersonsService;
        let httpMock: HttpTestingController;
        let elemDefault: IPersons;
        let currentDate: moment.Moment;
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule]
            });
            injector = getTestBed();
            service = injector.get(PersonsService);
            httpMock = injector.get(HttpTestingController);
            currentDate = moment();

            elemDefault = new Persons(0, 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', currentDate, false, 'AAAAAAA', 'AAAAAAA', 'AAAAAAA');
        });

        describe('Service methods', async () => {
            it('should find an element', async () => {
                const returnedFromService = Object.assign(
                    {
                        arrivalDate: currentDate.format(DATE_FORMAT)
                    },
                    elemDefault
                );
                service
                    .find(123)
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: elemDefault }));

                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should create a Persons', async () => {
                const returnedFromService = Object.assign(
                    {
                        id: 0,
                        arrivalDate: currentDate.format(DATE_FORMAT)
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        arrivalDate: currentDate
                    },
                    returnedFromService
                );
                service
                    .create(new Persons(null))
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'POST' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should update a Persons', async () => {
                const returnedFromService = Object.assign(
                    {
                        firstName: 'BBBBBB',
                        lastName: 'BBBBBB',
                        email: 'BBBBBB',
                        phoneNumber: 'BBBBBB',
                        arrivalDate: currentDate.format(DATE_FORMAT),
                        residencyStatus: true,
                        document: 'BBBBBB',
                        address: 'BBBBBB',
                        nacionality: 'BBBBBB'
                    },
                    elemDefault
                );

                const expected = Object.assign(
                    {
                        arrivalDate: currentDate
                    },
                    returnedFromService
                );
                service
                    .update(expected)
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'PUT' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should return a list of Persons', async () => {
                const returnedFromService = Object.assign(
                    {
                        firstName: 'BBBBBB',
                        lastName: 'BBBBBB',
                        email: 'BBBBBB',
                        phoneNumber: 'BBBBBB',
                        arrivalDate: currentDate.format(DATE_FORMAT),
                        residencyStatus: true,
                        document: 'BBBBBB',
                        address: 'BBBBBB',
                        nacionality: 'BBBBBB'
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        arrivalDate: currentDate
                    },
                    returnedFromService
                );
                service
                    .query(expected)
                    .pipe(
                        take(1),
                        map(resp => resp.body)
                    )
                    .subscribe(body => expect(body).toContainEqual(expected));
                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(JSON.stringify([returnedFromService]));
                httpMock.verify();
            });

            it('should delete a Persons', async () => {
                const rxPromise = service.delete(123).subscribe(resp => expect(resp.ok));

                const req = httpMock.expectOne({ method: 'DELETE' });
                req.flush({ status: 200 });
            });
        });

        afterEach(() => {
            httpMock.verify();
        });
    });
});
