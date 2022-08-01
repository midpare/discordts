import { GuildMember } from 'discord.js';
import { Event } from '../managers/Event';
import { Client } from '../structures/Client';

export default new Event({
  name: 'guildMemberAdd',
  execute: async (member: GuildMember) => {
    const client = <Client>member.client
    try { 
      member.roles.add('910521119713394739');
    } catch(error) {
      console.error(error);
    }
  },
});