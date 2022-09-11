import { TextChannel } from 'discord.js';
import { Command } from '../../managers/Command';

export default new Command({
  name: '초대링크',
  category: '기본',
  usage: '초대링크',
  description: '초대링크를 생성합니다.',
  execute: async ({ interaction, client }) => {
    const channel = <TextChannel>interaction.channel;
    const code = await interaction.guild?.invites.create(channel, { maxAge: 1 * 60 * 60, maxUses: 1 });
    interaction.reply(`성공적으로 초대링크를 생성했습니다!\n초대링크 ${code}`)
  },
});