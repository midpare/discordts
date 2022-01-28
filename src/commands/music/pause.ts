import player from '../../structures/Player';
import { Command } from '../../structures/Commands';

export default new Command({
  name: 'pause',
  category: '노래',
  usage: 'pause',
  description: '노래를 멈춥니다.',
  execute: async ({ msg, args }) => {
    if (!msg.member.voice.channel)
      return msg.reply('채널에 접속해주시기 바랍니다.');

    const queue = player.getQueue(msg.guildId);

    if (!queue)
      return msg.reply('노래가 재생되고 있지 않습니다.');

    queue.setPaused(true);

    msg.reply('노래를 정지합니다.');
  },
});