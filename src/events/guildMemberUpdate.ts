import { GuildMember, PartialGuildMember, TextChannel } from 'discord.js';
import { Event } from '../managers/Event';
import { Client } from '../structures/Client';

export default new Event({
  name: 'guildMemberUpdate',
  execute: async (client: Client, oldMember: GuildMember | PartialGuildMember, newMember: GuildMember) => {
    const before = oldMember.nickname;
    const after = newMember.nickname;

  },
});