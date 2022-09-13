import { Command } from '../../../managers/Command';

export default new Command({
  name: '내전종료',
  aliases: ['내전끝'],
  category: '게임',
  usage: '내전종료',
  description: '내전을 종료합니다.',
  execute: async ({ interaction, client }) => {
    const civilWar = client.civilWar;
    for (const user of civilWar.teams.flat()) {
      if (!user.voice || user.voice.channelId == null)
        continue;
      user.voice.setChannel(civilWar.channel);
    }

    civilWar.clear();
    interaction.reply('성공적으로 내전을 종료했습니다!');
    return 1;
  }
})