import { GuildMember, TextChannel } from 'discord.js';
import { Event } from '../managers/Event';
import { Client } from '../structures/Client';

export default new Event({
  name: 'guildMemberAdd',
  execute: async (client: Client, member: GuildMember) => {
    const guild = await client.models.guild.findOne({ id: member.guild.id });

    member.roles.add(guild.baseRole);

    const channel = <TextChannel>client.guilds.cache.get(member.guild.id)?.channels.cache.get(guild.log.join);

    if (!channel)
      return;

    channel?.send(`${member.displayName}#${member.user.discriminator}님이 서버에 입장하였습니다.`);
  },
});