import { Card } from './card';

export class List {
  public lastPulledAt?: Date;

  constructor(
    public id?: string,
    public cards?: Card[],
    public name?: string,
    public closed?: boolean,
    public idBoard?: string,
    public pos?: number,
    public subscribed?: boolean
  ) { }
}
