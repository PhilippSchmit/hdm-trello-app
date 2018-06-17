export class Board {
  constructor(
    public id: string,
    public name: string,
    public desc?: string,
    public closed?: boolean,
    public idOrganization?: string,
    public shortLink?: string,
    public dateLastActivity?: Date,
    public invited?: boolean,
    public starred?: boolean,
    public url?: boolean,
    public memberships?: any,
    public subscribed?: boolean,
    public labelNames?: Object,
    public dateLastView?: Date,
    public shortUrl?: string,
    public lastPulledAt?: Date
  ) { }
}
