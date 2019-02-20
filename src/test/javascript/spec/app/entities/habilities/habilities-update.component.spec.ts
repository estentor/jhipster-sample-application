/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { JHipsterAppTestModule } from '../../../test.module';
import { HabilitiesUpdateComponent } from 'app/entities/habilities/habilities-update.component';
import { HabilitiesService } from 'app/entities/habilities/habilities.service';
import { Habilities } from 'app/shared/model/habilities.model';

describe('Component Tests', () => {
    describe('Habilities Management Update Component', () => {
        let comp: HabilitiesUpdateComponent;
        let fixture: ComponentFixture<HabilitiesUpdateComponent>;
        let service: HabilitiesService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JHipsterAppTestModule],
                declarations: [HabilitiesUpdateComponent]
            })
                .overrideTemplate(HabilitiesUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(HabilitiesUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(HabilitiesService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Habilities(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.habilities = entity;
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
                    const entity = new Habilities();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.habilities = entity;
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
