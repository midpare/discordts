import { GuildMember } from 'discord.js';
import { Event } from '../managers/Event';
import { Client } from '../structures/Client';

export default new Event({
  name: 'guildMemberAdd',
  execute: async (client: Client, member: GuildMember) => {
    const guild = await client.models.guild.findOne({ id: member.guild.id });
    const temporary = guild.temporaryRole; 
    if (temporary == '0')
      return;

    try { 
      member.roles.add(temporary);
    } catch(error) {
      console.error(error);
    }
  },
});