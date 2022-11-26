import { GuildMember, TextChannel } from 'discord.js';
import { Event } from '../managers/Event';
import { Client } from '../structures/Client';

export default new Event({
  name: 'guildMemberAdd',
  execute: async (client: Client, member: GuildMember) => {
    const { id, displayName: name, guild: { id: guildId } } = member;
    const guild = await client.models.guild.findOne({ id: guildId });

    const newUser = new client.models.config({ id, name, guildId });
    newUser.save();
    
    if (guild.baseRole != '0')
      member.roles.add(guild.baseRole);

    const channel = <TextChannel>client.guilds.cache.get(member.guild.id)?.channels.cache.get(guild.log.join);

    if (!channel)
      return;

    const date = new Date().getTime()
    channel?.send(`<t:${date.toString().substring(0, 10)}>\n${member.displayName}#${member.user.discriminator}님이 서버에 입장하였습니다.`);
  },
});