import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IHabilities } from 'app/shared/model/habilities.model';

@Component({
    selector: 'jhi-habilities-detail',
    templateUrl: './habilities-detail.component.html'
})
export class HabilitiesDetailComponent implements OnInit {
    habilities: IHabilities;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ habilities }) => {
            this.habilities = habilities;
        });
    }

    previousState() {
        window.history.back();
    }
}
