import { TextChannel } from 'discord.js';
import { Event } from '../managers/Event';

export default new Event({
  name: 'voiceStateUpdate',
  execute: async (client, oldState, newState) => {
    const guild = await client.models.guild.findOne({ id: newState.guild.id });
    const logChannel = <TextChannel>newState.guild.channels.cache.get(guild.log.voice);

    if (!logChannel || oldState.channelId == newState.channelId || oldState.member?.user.bot)
      return;

    if (!oldState.channelId && newState.channelId) {
      logChannel.send(`${newState.member?.displayName}님이 "${newState.channel?.name}"채널에 입장했습니다.`);  
    } else if(oldState.channelId && !newState.channelId) {
      logChannel.send(`${newState.member?.displayName}님이 "${oldState.channel?.name}"채널에서 퇴장했습니다.`);
    }
  }
});