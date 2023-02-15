import { ActionRowBuilder, ApplicationCommandOptionType, bold, ButtonBuilder, ButtonStyle, EmbedBuilder, GuildMember } from 'discord.js';
import { Command } from '../../managers/Command';
import { InteractionOption } from '../../structures/interactions/InteractionOptions';
import { Utils } from '../../structures/Utils';

export default new Command({
  name: '오목',
  aliases: ['tictactoe'],
  category: '게임',
  usage: '오목 <유저>',
  description: '[유저]와 오목을 합니다.',
  options: [
    {
      name: '유저',
      description: '오목을 할 유저를 입력합니다.',
      type: ApplicationCommandOptionType.User,
      required: true,
    },
  ],
  execute: async ({ interaction, options, client }) => {
    const target = options.getMember('유저');
    if (!(target instanceof GuildMember) || !(interaction.member instanceof GuildMember))
      return 0;

    if (target.user.bot) {
      Utils.reply(interaction, '봇을 맨션할 수 없습니다.')
      return 0
    }
    const { guildId, user: { id } } = interaction;

    if (!guildId)
      return 0;

    if (target.id == id) {
      Utils.reply(interaction, '자신을 맨션할 수 없습니다.');
      return 0;
    }

    const customIds = Utils.uuid(2);
    const [yes, no] = customIds;
    const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
      new ButtonBuilder()
        .setCustomId(yes)
        .setStyle(ButtonStyle.Success)
        .setLabel('수락'),
      new ButtonBuilder()
        .setCustomId(no)
        .setStyle(ButtonStyle.Danger)
        .setLabel('거절'),
    )


    const embed = new EmbedBuilder()
      .setTitle('⚔ 오목')
      .setDescription(`${bold(interaction.member.displayName)}님이 ${bold(target.displayName)}님에게 오목 대결을 신청했습니다!`)

    interaction.reply({ embeds: [embed], components: [row] })
    const message = await interaction.fetchReply();
    setTimeout(() => {
      if (!message.editable)
        message.delete();
    }, 60 * 1000);

    const defaultOption = {
      ids: [target.id],
      guildId,
      message,
      customIds,
      data: [interaction.member, target],
    }

    client.interactionOptions.set(yes, new InteractionOption(Object.assign({}, defaultOption, { cmd: 'accept gomoku' })));
    client.interactionOptions.set(no, new InteractionOption(Object.assign({}, defaultOption, { cmd: 'cancel' })));
    
    return 1;
  }
})