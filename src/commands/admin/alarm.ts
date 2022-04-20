import { VoiceChannel } from 'discord.js';
import { Command } from '../../structures/Commands';
import { messages } from '../../util/language/message';

export default new Command({
  name: '알람',
  category: '관리자',
  usage: '알람 <유저>',
  description: '헤드셋과 마이크를 모두 끈 유저를 여러번 이동시킵니다.',
  execute: async ({ msg, args, client }) => {
    const target = msg.mentions.members?.first();
    const channel1 = <VoiceChannel>client.channels.cache.get('910521120770359323');
    const channel2 = <VoiceChannel>client.channels.cache.get('910521120770359324');
  
    if (!target)
      return msg.reply(messages.admin.alarm.missingMentionUser);
    
    if (target.user.bot)
      return msg.reply(messages.admin.alarm.bot);
    
    if (target.voice.channelId == null)
      return msg.reply(messages.missingVoiceChannelUser);

    if (!target.voice.selfDeaf)
      return msg.reply(messages.admin.alarm.missingSelfDeaf);

    const userChannel = target.voice.channel;
    await target.voice.setChannel(channel1);
    
    const previousInterval = setInterval(() => {
      if (target.voice.channelId == null || !target.voice.selfDeaf)
        return;
        target.voice.setChannel(channel1);
        target.voice.setChannel(channel2);
    }, 1000);

    setTimeout(() => {
      clearInterval(previousInterval);
      target.voice.setChannel(userChannel);
    }, 5000);
  },
});