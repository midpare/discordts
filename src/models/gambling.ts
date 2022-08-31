import { Schema } from 'mongoose';
import { Model } from '../managers/Model';

interface GamblingType {
  id: string;
  name: string;
  guildId: string;
  money: number;
  debt: number;
  dailyDate: number;
  bankruptcyTime: number;
  baseMoneyTime: number;
  coin: Array<{
    name: string; 
    count: number; 
    money: number
  }>
}

const gamblingInfo = new Schema<GamblingType>({
  id: String,
  name: String,
  guildId: String,
  dailyDate: { type: Number, default: 0 },
  money: { type: Number, default: 0 },
  debt: { type: Number, default: 0 },
  bankruptcyTime: { type: Number, default: 0 },
  baseMoneyTime: { type: Number, default: 0 },
  coin: [{name: String, count: Number, money: Number}, {_id: false}],
}, {
  versionKey: false
});

export default new Model('gambling', gamblingInfo)
