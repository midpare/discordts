import { Schema } from 'mongoose';
import { Model } from '../managers/Model';

export interface GamblingType {
  id: string;
  name: string;
  guildId: string;
  dailyDate: string;
  money: number;
  debt: number;
  bankruptcyTime: number;
  baseMoneyTime: number;
  coin: Array<{
    name: string; 
    count: number; 
    money: number
  }>;
  equipments: Array<{
    name: string
    rank: number
  }>;
  items: Array<{
    name: string;
    count: number
  }>
}

const gamblingInfo = new Schema<GamblingType>({
  id: String,
  name: String,
  guildId: String,
  dailyDate: { type: String, default: '0' },
  money: { type: Number, default: 0 },
  debt: { type: Number, default: 0 },
  bankruptcyTime: { type: Number, default: 0 },
  baseMoneyTime: { type: Number, default: 0 },
  coin: [{name: String, count: Number, money: Number}, {_id: false}],
  equipments: [{name: String, rank: Number}],
  items: [{ name: String, count: Number}]
}, {
  versionKey: false,
});

export default new Model('gambling', gamblingInfo);