import { Schema, model } from 'mongoose';

const slanginfo = new Schema({
  id: String,
  name: String,
  slangs: [String],
}, {
  versionKey: false
});

export const slang = model('slang', slanginfo);



