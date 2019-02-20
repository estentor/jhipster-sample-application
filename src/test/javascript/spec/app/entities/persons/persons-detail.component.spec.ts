/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JHipsterAppTestModule } from '../../../test.module';
import { PersonsDetailComponent } from 'app/entities/persons/persons-detail.component';
import { Persons } from 'app/shared/model/persons.model';

describe('Component Tests', () => {
    describe('Persons Management Detail Component', () => {
        let comp: PersonsDetailComponent;
        let fixture: ComponentFixture<PersonsDetailComponent>;
        const route = ({ data: of({ persons: new Persons(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JHipsterAppTestModule],
                declarations: [PersonsDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(PersonsDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PersonsDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.persons).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
