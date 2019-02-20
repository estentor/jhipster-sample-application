import { IPersons } from 'app/shared/model/persons.model';

export interface IGenre {
    id?: number;
    description?: string;
    persons?: IPersons;
}

export class Genre implements IGenre {
    constructor(public id?: number, public description?: string, public persons?: IPersons) {}
}
