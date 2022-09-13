import { ButtonStyle, PermissionFlagsBits, ActionRowBuilder, ButtonBuilder } from 'discord.js';
import { Command } from '../../managers/Command';
import { Utils } from '../../structures/Utils';

export default new Command({
  name: '역할받기',
  category: '관리자',
  usage: '역할받기',
  description: '역할을 받을 수 있는 버튼을 만듭니다.',
  default_member_permissions: PermissionFlagsBits.Administrator,
  execute: async ({ interaction, client }) => {
    const { guildId: id } = interaction;
    const guild = await client.models.guild.findOne({ id });

    const { temporaryRole, baseRole } = guild

    if (!interaction.guild?.roles.cache.has(temporaryRole) || !interaction.guild?.roles.cache.has(baseRole)) {
      Utils.reply(interaction, '임시역할과 기본역할을 등록해주시기 바랍니다.')
      return 0;
    }

    
    const row = <ActionRowBuilder<ButtonBuilder>>new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId('getRole')
        .setStyle(ButtonStyle.Primary)
        .setLabel('역할 받기'),
    );

    interaction.channel?.send({ content: '이 버튼을 눌러 역할을 받으세요.', components: [row] });
    Utils.reply(interaction, '성공적으로 역할 받기 버튼을 생성했습니다!');
    return 1;
  },
}); 