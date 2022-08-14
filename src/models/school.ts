import { Schema, model } from 'mongoose';
import { Model } from '../managers/Model';

interface SchoolType {
  id: string;
  guildId: string;
  name: string;
  cityCode: string;
  cityName: string;
  schoolCode: string;
  schoolName: string;
  grade: string;
  class: string;
}
const schoolInfo = new Schema<SchoolType>({
  id: String,
  guildId: String,
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

export default new Model('school', schoolInfo);

