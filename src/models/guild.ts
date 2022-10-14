import { Snowflake } from 'discord.js';
import { Schema } from 'mongoose';
import { Model } from '../managers/Model';

interface GuildType {
  id: Snowflake;
  punishment: Snowflake;
  gambling: Snowflake;
  command: Snowflake;
  slang: Snowflake;
  alarm: [Snowflake];
  civilWar: [Snowflake];
  log: {
    join: Snowflake
    command: Snowflake,
    message: Snowflake
    voice: Snowflake
  }
  baseRole: Snowflake;
}

const guildInfo = new Schema<GuildType>({
  id: String,
  punishment: {type: String, default: '0'},
  gambling: {type: String, default: '0'},
  command: {type: String, default: '0'},
  slang: {type: String, default: '0'},
  alarm: [{type: String, default: '0'}],
  civilWar: [{type: String, default: '0'}],
  log: {
    join: {type: String, default: '0'},
    command: {type: String, default: '0'},
    message: {type: String, default: '0'},
    voice: {type: String, default: '0'},
  },
  baseRole: {type: String, default: '0'},
}, {
  versionKey: false
});

export default new Model('guild', guildInfo);