import { TextChannel } from 'discord.js';
import { Event } from '../managers/Event';

export default new Event({
  name: 'guildMemberRemove',
  execute: async (client, member) => {
    const { id, guild: { id: guildId } } = member;
    (await client.models.config.deleteOne({ id, guildId })).deletedCount;

    const guild = await client.models.guild.findOne({ id: guildId });
    const logChannel = <TextChannel>member.guild.channels.cache.get(guild.log.join);
    if (!logChannel)
      return;

    const date = new Date().getTime()
    logChannel.send(`<t:${date.toString().substring(0, 10)}>\n${member.displayName}님이 퇴장했습니다.`);
  }
})