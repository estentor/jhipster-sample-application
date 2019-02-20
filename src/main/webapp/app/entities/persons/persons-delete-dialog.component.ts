import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPersons } from 'app/shared/model/persons.model';
import { PersonsService } from './persons.service';

@Component({
    selector: 'jhi-persons-delete-dialog',
    templateUrl: './persons-delete-dialog.component.html'
})
export class PersonsDeleteDialogComponent {
    persons: IPersons;

    constructor(protected personsService: PersonsService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.personsService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'personsListModification',
                content: 'Deleted an persons'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-persons-delete-popup',
    template: ''
})
export class PersonsDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ persons }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(PersonsDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.persons = persons;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/persons', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/persons', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
