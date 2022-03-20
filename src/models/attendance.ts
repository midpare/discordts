import { Schema, model } from 'mongoose';

const attendanceInfo = new Schema({
  id: String,
}, {
  versionKey: false
});

const attendance = model('attendance', attendanceInfo);
export { attendance };
