import { EmbedBuilder } from 'discord.js';
import { Command } from '../../managers/Command';
import { Utils } from '../../structures/Utils';

export default new Command({
  name: '학교확인',
  aliases: ['학교정보'],
  category: '학교',
  usage: '학교정보확인',
  description: '현재 자신의 학교 정보를 확인합니다.',
  execute: async ({ interaction, client }) => {
    const { guildId, user: { id, username } } = interaction;
    const user = await client.models.school.findOne({ id, guildId });

    const embed = new EmbedBuilder();
    if (!user) {
      Utils.reply(interaction, '학교등록이 되지 않은 유저입니다.');
      return;
    }

    embed
      .setTitle(`${username}님의 학교정보`)
      .setDescription(`${user.cityName} ${user.schoolName} ${user.grade}학년 ${user.class}반`);
    interaction.reply({ embeds: [embed] });
  },
});