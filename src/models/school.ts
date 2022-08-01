import { Schema, model } from 'mongoose';

const schoolInfo = new Schema({
  id: String,
  name: String,
  cityCode: String,
  cityName: String,
  schoolCode: String,
  schoolName: String,
  grade: String,
  class: String,
}, {
  versionKey: false
});

export const school = model('school', schoolInfo);


