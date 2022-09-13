import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';
import { Command } from '../../managers/Command';

export default new Command({
  name: '코인현황',
  aliases: ['코인시세', '코인가격'],
  category: '코인',
  usage: '코인현황',
  description: '현재 코인들의 시세를 확인합니다.',
  execute: async ({ interaction }) => {
    const row = <ActionRowBuilder<ButtonBuilder>>new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setURL('https://upbit.com/exchange')
        .setStyle(ButtonStyle.Link)
        .setLabel('거래소')
    );
    interaction.reply({ content: '이곳을 눌러 현황을 확인하세요', components: [row] });
    return 1;
  },
});