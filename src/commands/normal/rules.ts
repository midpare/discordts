import { EmbedBuilder } from 'discord.js';
import { Command } from '../../managers/Commands';
import { Rules } from '../../language/rules';

export default new Command({
  name: '규칙',
  private: true,
  execute: ({ msg }) => {
    const embed = new EmbedBuilder()
      .setTitle('규칙');
    const rules = new Rules();

    for (const [name, value] of Object.entries(rules)) {
      embed.addFields({ name, value: value.join('\n'), inline: false });
    }

    msg.channel.send({ embeds: [embed] });
  },
});