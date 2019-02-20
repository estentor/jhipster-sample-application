import { IPersons } from 'app/shared/model/persons.model';

export interface IDocumentType {
    id?: number;
    description?: string;
    persons?: IPersons;
}

export class DocumentType implements IDocumentType {
    constructor(public id?: number, public description?: string, public persons?: IPersons) {}
}
