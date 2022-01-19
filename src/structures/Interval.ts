import { IntervalType } from '../typings/Interval';

export class Interval {
  constructor(options: IntervalType) {
    Object.assign(this, options);
  }
}