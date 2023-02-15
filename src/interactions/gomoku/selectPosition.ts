import { Interaction } from '../../managers/Interaction';
import { ModalBuilder, TextInputBuilder, ButtonInteraction, TextInputStyle, ActionRowBuilder, GuildMember } from 'discord.js';
import { Utils } from '../../structures/Utils';
import { InteractionOption } from '../../structures/interactions/InteractionOptions';

export default new Interaction<ButtonInteraction, null>({
  name: 'gomoku selectPosition',
  execute: async ({ interaction, options, client }) => {
    const customId = Utils.uuid();
    const modal = new ModalBuilder()
      .setCustomId(customId)
      .setTitle('좌표를 입력해주세요\n반드시 숫자만을 기입해주시기 바랍니다.');

    const positionX = new ActionRowBuilder<TextInputBuilder>().setComponents(
      new TextInputBuilder()
        .setCustomId('x')
        .setLabel('가로 좌표를 입력해주세요.')
        .setStyle(TextInputStyle.Short)
        .setPlaceholder('이곳에 입력해주세요')
        .setMaxLength(2),
    );

    const positionY = new ActionRowBuilder<TextInputBuilder>().setComponents(
      new TextInputBuilder()
      .setCustomId('y')
      .setLabel('세로 좌표를 입력해주세요.')
      .setStyle(TextInputStyle.Short)
      .setPlaceholder('이곳에 입력해주세요')
      .setMaxLength(2),
    );

    modal.addComponents(positionX, positionY);
    interaction.showModal(modal);

    client.interactionOptions.set(customId, new InteractionOption(Object.assign({}, options, { cmd: 'gomoku setRock' })));
  },
});