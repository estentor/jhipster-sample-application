/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { JHipsterAppTestModule } from '../../../test.module';
import { PersonsDeleteDialogComponent } from 'app/entities/persons/persons-delete-dialog.component';
import { PersonsService } from 'app/entities/persons/persons.service';

describe('Component Tests', () => {
    describe('Persons Management Delete Component', () => {
        let comp: PersonsDeleteDialogComponent;
        let fixture: ComponentFixture<PersonsDeleteDialogComponent>;
        let service: PersonsService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JHipsterAppTestModule],
                declarations: [PersonsDeleteDialogComponent]
            })
                .overrideTemplate(PersonsDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PersonsDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PersonsService);
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
