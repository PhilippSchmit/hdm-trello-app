import * as moment from 'moment';
import { generate as generateId } from 'shortid';
import { Card } from '../models/card';

export type DayGroupedList = Array<{
  id: string,
  cards: Card[],
  start: Date,
  end: Date,
}>;

export const buildDayGroupedList = (startDate: Date, dayRange: number): DayGroupedList => {
  return new Array(dayRange)
    .fill(undefined)
    .map((_, i) => ({
      id: generateId(),
      cards: [],
      start: moment(startDate).add(i, 'days').startOf('day').toDate(),
      end: moment(startDate).add(i, 'days').endOf('day').toDate(),
    }));
};
