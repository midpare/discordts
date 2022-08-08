import { ActionRowBuilder, ApplicationCommandOptionType, bold, ButtonBuilder, ButtonStyle, EmbedBuilder } from 'discord.js';
import { Command } from '../../managers/Command';
import { InteractionOptions } from '../../structures/InteractionOptions';
import { Utils } from '../../structures/Utils';

export default new Command({
  name: '틱택토',
  aliases: ['tictactoe'],
  category: '게임',
  usage: '틱택토 <유저>',
  description: '[유저]와 틱택토 게임을 합니다.',
  options: [
    {
      name: '유저',
      description: '틱택토를 할 유저를 입력합니다.',
      type: ApplicationCommandOptionType.User,
      required: true,
    },
  ],
  execute: async ({ interaction, options, client }) => {
    const target = options.getUser('유저', true);
    const id = interaction.user.id
    
    if (target.id == id) {
      Utils.reply(interaction, '자신을 맨션할 수 없습니다.');
      return;
    }

    const customIds = Utils.uuid(2);
    const [yes, no] = customIds;
    const row = <ActionRowBuilder<ButtonBuilder>>new ActionRowBuilder().addComponents(
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
      .setTitle('⚔ 틱택토')
      .setDescription(`${bold(interaction.user.username)}가 ${bold(target.username)}에게 틱택토 매치를 신청했습니다!`)

    interaction.reply({ embeds: [embed], components: [row] })
    const message = await interaction.fetchReply();

    client.interactionOptions.set(yes, new InteractionOptions({
      ids: [target.id],
      cmd: 'accept-tic-tac-toe',
      messages: [message],
      customIds,
      etc: {
        players: [interaction.user, target],
      },
    }));

    client.interactionOptions.set(no, new InteractionOptions({
      ids: [id, target.id],
      cmd: 'cancel',
      messages: [message],
      customIds,
    }));
  }
})