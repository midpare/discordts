import { EmbedBuilder } from 'discord.js';
import { Rules } from '../../language/rules';
import { Command } from '../../managers/Command';

export default new Command({
  name: '규칙',
  category: '기본',
  usage: '규칙',
  description: '규칙을 확인합니다.',
  execute: async ({ interaction }) => {
    const embed = new EmbedBuilder()
      .setTitle('규칙');
    const rules = new Rules();

    for (const [name, value] of Object.entries(rules)) {
      embed.addFields({ name, value: value.join('\n'), inline: false });
    }

    interaction.reply({ embeds: [embed] });
  },
});