import { Schema, model } from 'mongoose';

const configInfo = new Schema({
  id: String,
  name: String,
  guildId: String,
  slangs: [String],
  warning: { type: Number, default: 0 },
  baseMoneyCoolTime: { type: Number, default: 0 },
  bankruptcyTime: { type: Number, default: 0 },
  banTime: { type: Number, default: 0 },
  MuteTime: { type: Number, default: 0 },
}, {
  versionKey: false
});

export const config = model('config', configInfo);



