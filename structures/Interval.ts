import { IntervalType } from '../typings/interval';

export class Interval {
  constructor(options: IntervalType) {
    Object.assign(this, options);
  }
}