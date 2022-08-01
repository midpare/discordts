import { gambling } from '../models/gambling';
import { school } from '../models/school';
import Mongoose from 'mongoose';
import { config } from '../models/config';

export class Model {
  public readonly gambling: Mongoose.Model<any, {}, {}, {}>;
  public readonly school: Mongoose.Model<any, {}, {}, {}>;
  public readonly config: Mongoose.Model<any, {}, {}, {}>;

  constructor() {
    this.gambling = gambling;
    this.school = school;
    this.config = config
  }
}