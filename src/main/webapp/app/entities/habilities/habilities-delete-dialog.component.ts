import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IHabilities } from 'app/shared/model/habilities.model';
import { HabilitiesService } from './habilities.service';

@Component({
    selector: 'jhi-habilities-delete-dialog',
    templateUrl: './habilities-delete-dialog.component.html'
})
export class HabilitiesDeleteDialogComponent {
    habilities: IHabilities;

    constructor(
        protected habilitiesService: HabilitiesService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.habilitiesService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'habilitiesListModification',
                content: 'Deleted an habilities'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-habilities-delete-popup',
    template: ''
})
export class HabilitiesDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ habilities }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(HabilitiesDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.habilities = habilities;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/habilities', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/habilities', { outlets: { popup: null } }]);
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
