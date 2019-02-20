import { Moment } from 'moment';
import { IDocumentType } from 'app/shared/model/document-type.model';
import { IGenre } from 'app/shared/model/genre.model';
import { ICountry } from 'app/shared/model/country.model';
import { IRegion } from 'app/shared/model/region.model';
import { ILocation } from 'app/shared/model/location.model';
import { IHabilities } from 'app/shared/model/habilities.model';

export interface IPersons {
    id?: number;
    firstName?: string;
    lastName?: string;
    email?: string;
    phoneNumber?: string;
    arrivalDate?: Moment;
    residencyStatus?: boolean;
    document?: string;
    address?: string;
    nacionality?: string;
    documentType?: IDocumentType;
    genre?: IGenre;
    country?: ICountry;
    region?: IRegion;
    location?: ILocation;
    habilities?: IHabilities[];
}

export class Persons implements IPersons {
    constructor(
        public id?: number,
        public firstName?: string,
        public lastName?: string,
        public email?: string,
        public phoneNumber?: string,
        public arrivalDate?: Moment,
        public residencyStatus?: boolean,
        public document?: string,
        public address?: string,
        public nacionality?: string,
        public documentType?: IDocumentType,
        public genre?: IGenre,
        public country?: ICountry,
        public region?: IRegion,
        public location?: ILocation,
        public habilities?: IHabilities[]
    ) {
        this.residencyStatus = this.residencyStatus || false;
    }
}
