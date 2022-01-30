import { IntervalType } from '../util/types/interval';

export class Interval {
  constructor(options: IntervalType) {
    Object.assign(this, options);
  }
}