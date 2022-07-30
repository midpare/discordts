import { Schema, model } from 'mongoose';

const slanginfo = new Schema({
  id: String,
  name: String,
  slangs: [String],
}, {
  versionKey: false
});

const slang = model('slang', slanginfo);
export { slang };


