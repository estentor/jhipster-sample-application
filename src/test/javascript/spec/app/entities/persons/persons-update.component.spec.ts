/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { JHipsterAppTestModule } from '../../../test.module';
import { PersonsUpdateComponent } from 'app/entities/persons/persons-update.component';
import { PersonsService } from 'app/entities/persons/persons.service';
import { Persons } from 'app/shared/model/persons.model';

describe('Component Tests', () => {
    describe('Persons Management Update Component', () => {
        let comp: PersonsUpdateComponent;
        let fixture: ComponentFixture<PersonsUpdateComponent>;
        let service: PersonsService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JHipsterAppTestModule],
                declarations: [PersonsUpdateComponent]
            })
                .overrideTemplate(PersonsUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(PersonsUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PersonsService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Persons(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.persons = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Persons();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.persons = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
