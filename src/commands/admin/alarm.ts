import { VoiceChannel } from 'discord.js';
import { Command } from '../../managers/Commands';

export default new Command({
  name: '알람',
  category: '관리자',
  usage: '알람 <유저>',
  description: '헤드셋과 마이크를 모두 끈 유저를 여러번 이동시킵니다.',
  execute: async ({ msg, client }) => {
    const target = msg.mentions.members?.first();
    const channel1 = <VoiceChannel>client.channels.cache.get('910521120770359323');
    const channel2 = <VoiceChannel>client.channels.cache.get('910521120770359324');

    if (!target) {
      msg.reply(client.messages.admin.alarm.missingMentionUser);
      return;
    }

    if (target.user.bot) {
      msg.reply(client.messages.admin.alarm.bot);
      return;
    }

    if (target.voice.channelId == null) {
      msg.reply(client.messages.missingVoiceChannelUser);
      return;
    }

    if (!target.voice.selfDeaf) {
      msg.reply(client.messages.admin.alarm.missingSelfDeaf);
      return;
    }

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