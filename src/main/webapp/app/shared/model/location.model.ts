import { ICountry } from 'app/shared/model/country.model';
import { IPersons } from 'app/shared/model/persons.model';

export interface ILocation {
    id?: number;
    streetAddress?: string;
    postalCode?: string;
    city?: string;
    stateProvince?: string;
    country?: ICountry;
    persons?: IPersons;
}

export class Location implements ILocation {
    constructor(
        public id?: number,
        public streetAddress?: string,
        public postalCode?: string,
        public city?: string,
        public stateProvince?: string,
        public country?: ICountry,
        public persons?: IPersons
    ) {}
}
