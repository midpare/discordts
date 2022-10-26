import { EmbedBuilder } from 'discord.js';
import { Command } from '../../managers/Command';
import { Utils } from '../../structures/Utils';

export default new Command({
  name: '장비보유',
  category: '강화',
  usage: '장비보유',
  description: '현재 보유한 장비를 확인합니다.',
  execute: async ({ interaction, client }) => {
    const { guildId, user: { id } } = interaction;
    const user = await client.models.gambling.findOne({ guildId, id });

    if (!user.items[0]) {
      Utils.reply(interaction, '보유한 장비가 없습니다.');
      return 0;
    }

    const items = user.items.map((e: { name: String, rank: number }) => {
      return {
        name: e.name,
        value: `강화 횟수: ${e.rank}강`,
        inline: false
      }
    });

    const embed = new EmbedBuilder()
      .setTitle(`${user.name}님의 장비`)
      .setDescription(`${items.length}/5개 보유중`)
      .setFields(items);
    
    interaction.reply({ embeds: [embed] });
    return 1;
  },
});