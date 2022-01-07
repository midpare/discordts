import { MessageEmbed } from 'discord.js';
import { Command } from '../../../structures/Commands';
import { shuffle } from '../../../structures/Util';

export default new Command({
  name: '팀',
  aliases: ['팀'],
  category: '기본',
  usage: '팀 <이름> <이름> ...',
  description: '적은 <이름>만큼의 유저를 1팀과 2팀으로 나눕니다.',
  execute: async ({ msg, args }) => {
    const embed = new MessageEmbed();
    if (!args[0])
      return msg.reply('기입할 이름을 입력해주세요');
    const length = args.length;
    const shuffleArgs = shuffle(args);
    const team1 = new Array();
    const team2 = new Array();
    for (let i = 0; i < length; i += 2) {
      team1.push(shuffleArgs[i]);
      team2.push(shuffleArgs[i + 1]);
    }

    embed
      .setTitle('팀')
      .addFields(
        { name: '1팀', value: `${team1.join(', ')}`, inline: false},
        { name: '2팀', value: `${team2.join(', ')}`, inline: false},
      );

    msg.channel.send({ embeds: [embed] });
  },
});