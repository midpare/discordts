import { VoiceChannel } from 'discord.js';
import { client } from '../../structures/Client';
import { Command } from '../../structures/Commands';
import { messages } from '../../util/language/message';

export default new Command({
  name: '알람',
  category: '관리자',
  usage: '알람 <유저>',
  description: '헤드셋과 마이크를 모두 끈 유저를 여러번 이동시킵니다.',
  execute: async ({ msg, args }) => {
    const target = msg.mentions.members?.first();
    const nextChannel = <VoiceChannel>client.channels.cache.get('910521120770359323');
  
    if (!target)
      return msg.reply(messages.admin.alarm.missingMentionUser);
    
    if (target.user.bot)
      return msg.reply(messages.admin.alarm.bot);
    
    if (target.voice.channelId == null)
      return msg.reply(messages.missingVoiceChannelUser);

    if (!target.voice.selfDeaf)
      return msg.reply(messages.admin.alarm.missingSelfDeaf);

    const previousChannel = target.voice.channel;
    await target.voice.setChannel(nextChannel);
    
    const previousInterval = setInterval(() => {
      if (target.voice.channelId == null)
        return;
      target.voice.setChannel(previousChannel);
      target.voice.setChannel(nextChannel);
    }, 1000);

    setTimeout(() => {
      clearInterval(previousInterval);
      target.voice.setChannel(previousChannel);
    }, 5000);
  },
});