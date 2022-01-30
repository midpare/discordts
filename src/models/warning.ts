import { Schema, model } from 'mongoose';

const warningInfo = new Schema({
  id: String,
  name: String,
  warning: { type: Number, default: 0 },
}, {
  versionKey: false
});

const warning = model('warning', warningInfo);
export { warning };


