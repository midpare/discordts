import { gambling } from '../models/gambling';
import { school } from '../models/school';
import { warning } from '../models/warning';
import Mongoose from 'mongoose';
import { attendance } from '../models/attendance';
import { slang } from '../models/slang';

export class Model {
  public readonly gambling: Mongoose.Model<any, {}, {}, {}>;
  public readonly school: Mongoose.Model<any, {}, {}, {}>;
  public readonly attendance: Mongoose.Model<any, {}, {}, {}>;
  public readonly warning: Mongoose.Model<any, {}, {}, {}>;
  public readonly slang: Mongoose.Model<any, {}, {}, {}>;

  constructor() {
    this.gambling = gambling;
    this.school = school;
    this.warning = warning;
    this.attendance = attendance;
    this.slang = slang;
  }
}