import { MessageEmbed } from 'discord.js';
import { Command } from '../../../structures/Commands';
import wholeRules from '../../../../config/rules.json';

export default new Command({
  name: '규칙',
  aliases: ['룰', '법전'],
  category: '기본',
  usage: '규칙',
  description: '서버 규칙을 확인합니다.',
  execute: ({ msg, args }) => {
    const embed = new MessageEmbed()
      .setTitle('규칙');

    const rules = Object.assign(wholeRules)

    for (const i in rules) {
      embed.addField(i, rules[i].join('\n'), false);
    }

    msg.channel.send({ embeds: [embed] });
  },
});