import { EmbedBuilder } from 'discord.js';
import { SlashCommand } from '../../managers/SlashCommand';
import { Utils } from '../../structures/Utils';

export default new SlashCommand({
  name: '베팅현황',
  category: '베팅',
  usage: '베팅현황',
  description: '현재 베팅의 현황을 확인합니다.',
  execute: async ({ interaction, client }) => {
    const guildId = interaction.guildId ?? ''
    const betting = client.betting.get(guildId);
    if (!betting) {
      Utils.reply(interaction, '아직 베팅을 시작하지 않았습니다.');
      return;
    }

    const embed = new EmbedBuilder();
    const persent = betting.persent;

    embed
      .setTitle('베팅 현황')
      .setDescription('베팅 현황을 확인합니다.')
      .setFields(
        { name: `${betting.bet1.name}`, value: `${betting.bet1.sum.toLocaleString()}원(${Math.round(persent.bet1)}%) \n참여인원: ${betting.bet1.user.length.toLocaleString()}명 \n배율: ${Math.round(betting.times.bet1 * 100) / 100}배`, inline: true },
        { name: `${betting.bet2.name}`, value: `${betting.bet2.sum.toLocaleString()}원(${Math.round(persent.bet2)}%) \n참여인원: ${betting.bet2.user.length.toLocaleString()}명 \n배율: ${Math.round(betting.times.bet2 * 100) / 100}배`, inline: true },
      );

    interaction.reply({ embeds: [embed] });
  },
});