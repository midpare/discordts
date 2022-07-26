import { gambling } from '../models/gambling';
import { school } from '../models/school';
import { warning } from '../models/warning';
import { attendance } from '../models/attendance';
import Mongoose from 'mongoose';

export class Model {
  public readonly gambling: Mongoose.Model<any, {}, {}, {}>;
  public readonly school: Mongoose.Model<any, {}, {}, {}>;
  public readonly attendance: Mongoose.Model<any, {}, {}, {}>;
  public readonly warning: Mongoose.Model<any, {}, {}, {}>;

  constructor() {
    this.gambling = gambling;
    this.school = school;
    this.warning = warning;
    this.attendance = attendance;
  }
}