export interface IHabilities {
    id?: number;
    title?: string;
    description?: string;
}

export class Habilities implements IHabilities {
    constructor(public id?: number, public title?: string, public description?: string) {}
}
