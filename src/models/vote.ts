import { Snowflake } from 'discord.js';
import { Schema } from 'mongoose';
import { Model } from '../managers/Model';

interface VoteType {
  id: Snowflake;
  score: number
}

const voteInfo = new Schema<VoteType>({
  id: String,
  score: Number,
}, {
  versionKey: false
});

export default new Model('vote', voteInfo);