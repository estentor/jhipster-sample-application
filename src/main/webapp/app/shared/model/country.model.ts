import { IRegion } from 'app/shared/model/region.model';
import { IPersons } from 'app/shared/model/persons.model';

export interface ICountry {
    id?: number;
    countryName?: string;
    region?: IRegion;
    persons?: IPersons;
}

export class Country implements ICountry {
    constructor(public id?: number, public countryName?: string, public region?: IRegion, public persons?: IPersons) {}
}
