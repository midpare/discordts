import { client } from '../../../structures/Client';
import { Command } from '../../../structures/Commands';
import { civilWar } from '../../../structures/game/CivilWar';

export default new Command({
  name: '종료',
  aliases: ['끝'],
  category: '내전',
  usage: '내전 종료',
  description: '내전을 종료합니다.',
  execute: ({ msg, args }) => {
    const channel = client.channels.cache.get(msg.mentions.channels.first()?.id || '')
    if (!channel || !channel.isVoice())
      return msg.reply('정확한 음성채널을 맨션해주시기 바랍니다.');

    for (const user of civilWar.allTeam) {
      if (!user.voice || user.voice.channelId == null)
        continue;
      user.voice.setChannel(channel);
    }
  }
})