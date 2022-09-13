import { TextChannel } from "discord.js";
import { Event } from "../managers/Event";

export default new Event({
  name: 'voiceStateUpdate',
  execute: async (client, oldState, newState) => {
    const { id, guild: { id: guildId }} = newState;
    const user = await client.models.config.findOne({ id, guildId });
    const guild = await client.models.guild.findOne({ id: newState.guild.id });
    const logChannel = <TextChannel>newState.guild.channels.cache.get(guild.log.voice);
    
    if (user && !user.activity) {
      (await client.models.config.updateOne({ id, guildId }, { $set: { activity: true } })).matchedCount;
    }

    if (!logChannel)
      return;

    if (oldState.channelId == newState.channelId)
      return;

    if (!oldState.channelId && newState.channelId) {
      logChannel.send(`${newState.member?.displayName}님이 ${newState.channel?.name}채널에 입장했습니다.`);  
    } else if(oldState.channelId && !newState.channelId) {
      logChannel.send(`${newState.member?.displayName}님이 ${oldState.channel?.name}채널에서 퇴장했습니다.`);
    }
  }
});