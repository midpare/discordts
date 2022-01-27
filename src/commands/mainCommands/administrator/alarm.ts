import { VoiceChannel } from 'discord.js';
import { client } from '../../../structures/Client';
import { Command } from '../../../structures/Commands';

export default new Command({
  name: '알람',
  category: '관리자',
  usage: '알람 <유저>',
  description: '헤드셋과 마이크를 모두 끈 유저를 여러번 이동시킵니다.',
  execute: async ({ msg, args }) => {
    if (!msg.member.permissions.has('MOVE_MEMBERS'))
      return msg.reply('당신은 명령어를 사용할 권한이 없습니다.');
    const target = msg.mentions.members?.first();
    const nextChannel = <VoiceChannel>client.channels.cache.get('910521120770359323');
    
    if (!target)
      return msg.reply('이동할 유저를 맨션해주시기바랍니다.');
    
    if (target.user.bot)
      return msg.reply('봇에게 알람기능을 사용할 수는 없습니다.');

    if (target.voice.channelId == null)
      return msg.reply('이 유저는 음성채널에 접속해있지 않습니다.');

    if (!target.voice.selfDeaf)
      return msg.reply('이 유저는 헤드셋을 끄고있지 않습니다.');

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