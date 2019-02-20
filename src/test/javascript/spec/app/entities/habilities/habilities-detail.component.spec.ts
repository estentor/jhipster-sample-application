/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JHipsterAppTestModule } from '../../../test.module';
import { HabilitiesDetailComponent } from 'app/entities/habilities/habilities-detail.component';
import { Habilities } from 'app/shared/model/habilities.model';

describe('Component Tests', () => {
    describe('Habilities Management Detail Component', () => {
        let comp: HabilitiesDetailComponent;
        let fixture: ComponentFixture<HabilitiesDetailComponent>;
        const route = ({ data: of({ habilities: new Habilities(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JHipsterAppTestModule],
                declarations: [HabilitiesDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(HabilitiesDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(HabilitiesDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.habilities).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
