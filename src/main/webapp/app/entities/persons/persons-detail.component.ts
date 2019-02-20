import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPersons } from 'app/shared/model/persons.model';

@Component({
    selector: 'jhi-persons-detail',
    templateUrl: './persons-detail.component.html'
})
export class PersonsDetailComponent implements OnInit {
    persons: IPersons;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ persons }) => {
            this.persons = persons;
        });
    }

    previousState() {
        window.history.back();
    }
}
