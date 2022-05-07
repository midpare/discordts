import { GuildMember } from 'discord.js';
import { Event } from '../managers/Event';

export default new Event({
  name: 'guildMemberAdd',
  execute: async (member: GuildMember) => {
    try { 
      member.roles.add('910521119713394739');
    } catch(error) {
      console.error(error);
    }
  },
});