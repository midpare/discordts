import { TextChannel } from 'discord.js';
import { Event } from '../managers/Event';

export default new Event({
  name: 'guildMemberRemove',
  execute: async (client, member) => {
    const { id, guild: { id: guildId } } = member;
    (await client.models.config.deleteOne({ id, guildId })).deletedCount;

    const guild = await client.models.guild.findOne({ id: guildId });
    const logChannel = <TextChannel>member.guild.channels.cache.get(guild.log.exit);
    if (!logChannel)
      return;
    
    logChannel.send(`${member.displayName}님이 퇴장했습니다.`);
  }
})