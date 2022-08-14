import { Schema, model } from 'mongoose';
import { Model } from '../managers/Model';

interface GamblingType {
  id: string;
  name: string;
  guildId: string;
  date: number;
  money: number;
  debt: number;
  bankruptcy: number;
  stock: Array<{
    name: string; 
    count: number; 
    money: number
  }>
}

const gamblingInfo = new Schema<GamblingType>({
  id: String,
  name: String,
  guildId: String,
  date: { type: Number, default: 0 },
  money: { type: Number, default: 0 },
  debt: { type: Number, default: 0 },
  bankruptcy: { type: Number, default: 0 },
  stock: [{name: String, count: Number, money: Number}, {_id: false}],
}, {
  versionKey: false
});

export default new Model('gambling', gamblingInfo)
