import { IPersons } from 'app/shared/model/persons.model';

export interface IRegion {
    id?: number;
    regionName?: string;
    persons?: IPersons;
}

export class Region implements IRegion {
    constructor(public id?: number, public regionName?: string, public persons?: IPersons) {}
}
