/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { JHipsterAppTestModule } from '../../../test.module';
import { HabilitiesDeleteDialogComponent } from 'app/entities/habilities/habilities-delete-dialog.component';
import { HabilitiesService } from 'app/entities/habilities/habilities.service';

describe('Component Tests', () => {
    describe('Habilities Management Delete Component', () => {
        let comp: HabilitiesDeleteDialogComponent;
        let fixture: ComponentFixture<HabilitiesDeleteDialogComponent>;
        let service: HabilitiesService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JHipsterAppTestModule],
                declarations: [HabilitiesDeleteDialogComponent]
            })
                .overrideTemplate(HabilitiesDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(HabilitiesDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(HabilitiesService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
