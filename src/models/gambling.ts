import { Schema, model } from 'mongoose';

const gamblingInfo = new Schema({
  id: String,
  name: String,
  date: { type: Number, default: 0 },
  money: { type: Number, default: 0 },
  debt: { type: Number, default: 0 },
  principalDebt: { type: Number, default: 0 },
  gamLevel: { type: Number, default: 1 },
  bankruptcy: { type: Number, default: 0 },
  baseMoneyCoolTime: { type: Number, default: 0 },
  stock: [{name: String, count: Number, money: Number}, {_id: false}],
}, {
  versionKey: false
});

export const gambling = model('gambling', gamblingInfo);
