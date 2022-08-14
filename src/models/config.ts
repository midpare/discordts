import { Snowflake } from 'discord.js';
import { Schema } from 'mongoose';
import { Model } from '../managers/Model';

interface ConfigType {
  id: Snowflake;
  name: string;
  guildId: Snowflake;
  slangs: [string];
  warning: number;
  baseMoneyCoolTime: number;
  bankruptcyTime: number;
  banTime: number;
  MuteTime: number;
}

const configInfo = new Schema<ConfigType>({
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

export default new Model('config', configInfo);