import { EmbedBuilder } from 'discord.js';
import { Command } from '../../managers/Commands';
import wholeRules from '../../language/rules.json';

export default new Command({
  name: '규칙',
  aliases: ['룰', '법전'],
  category: '기본',
  usage: '규칙',
  description: '서버 규칙을 확인합니다.',
  execute: ({ msg }) => {
    const embed = new EmbedBuilder()
      .setTitle('규칙');
      
    const rules = Object.assign(wholeRules);

    for (const i in rules) {
      embed.addFields({ name: i, value: rules[i].join('\n'), inline: false});
    }

    msg.channel.send({ embeds: [embed] });
  },
});