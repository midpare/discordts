import { gambling } from '../models/gambling';
import { school } from '../models/school';
import Mongoose from 'mongoose';
import { attendance } from '../models/attendance';
import { slang } from '../models/slang';
import { config } from '../models/config';

export class Model {
  public readonly gambling: Mongoose.Model<any, {}, {}, {}>;
  public readonly school: Mongoose.Model<any, {}, {}, {}>;
  public readonly attendance: Mongoose.Model<any, {}, {}, {}>;
  public readonly slang: Mongoose.Model<any, {}, {}, {}>;
  public readonly config: Mongoose.Model<any, {}, {}, {}>;

  constructor() {
    this.gambling = gambling;
    this.school = school;
    this.attendance = attendance;
    this.slang = slang;
    this.config = config
  }
}