import { Events, GuildMember, TextChannel } from 'discord.js';
import { Event } from '../managers/Event.js';
import { MidpareClient } from '../structures/Client.js';

export default new Event({
  name: Events.GuildMemberAdd,
  execute: async (client: MidpareClient, member: GuildMember) => {
    const { id, displayName: name, guild: { id: guildId } } = member;
    const guild = await client.models.guild.findOne({ id: guildId });

    
    if (guild.baseRole && guild.baseRole != '0')
      member.roles.add(guild.baseRole);
    
    const exist = await client.models.config.findOne({ id, name, guildId });
    if (exist)
      return;

    const newUser = new client.models.config({ id, name, guildId });
    newUser.save();

    const channel = <TextChannel>client.guilds.cache.get(member.guild.id)?.channels.cache.get(guild.log.join);

    if (!channel)
      return;

    const date = new Date().getTime();
    channel?.send(`<t:${date.toString().substring(0, 10)}>\n${member.displayName}#${member.user.tag}님이 서버에 입장하였습니다.`);
  },
});