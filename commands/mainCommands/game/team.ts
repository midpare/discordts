import { MessageEmbed } from 'discord.js';
import { Command } from '../../../structures/Commands';
import { shuffle } from '../../../structures/Util';

export default new Command({
  name: '팀',
  aliases: ['팀'],
  category: '게임',
  usage: '팀 <이름> <이름> ...',
  description: '적은 <이름>만큼의 유저를 1팀과 2팀으로 나눕니다.',
  execute: async ({ msg, args }) => {
    const embed = new MessageEmbed()
      .setTitle('팀');
    if (!args[0])
      return msg.reply('기입할 이름을 입력해주세요');
    const length = args.length;
    const team = shuffle(args);
    for (let i = 0; i < length; i++) {
      if (i < length / 2)
        embed.addField('1팀', `${team[i]}`, false);
      else
        embed.addField('2팀', `${team[i]}`, false);
    }

    msg.channel.send({ embeds: [embed] });
  },
});