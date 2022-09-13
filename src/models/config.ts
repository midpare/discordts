import { Snowflake } from 'discord.js';
import { Schema } from 'mongoose';
import { Model } from '../managers/Model';

interface ConfigType {
  id: Snowflake;
  name: string;
  guildId: Snowflake;
  slangs: [string];
  activity: boolean
  warning: number;
  banTime: number;
  MuteTime: number;
}

const configInfo = new Schema<ConfigType>({
  id: String,
  name: String,
  guildId: String,
  slangs: [String],
  activity: { type: Boolean, default: false },
  warning: { type: Number, default: 0 },
  banTime: { type: Number, default: 0 },
  MuteTime: { type: Number, default: 0 },
}, {
  versionKey: false
});

export default new Model('config', configInfo);