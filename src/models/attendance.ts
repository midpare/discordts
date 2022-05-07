import { Schema, model } from 'mongoose';

const attendanceInfo = new Schema({
  id: String,
}, {
  versionKey: false
});

export const attendance = model('attendance', attendanceInfo);

