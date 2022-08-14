import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';
import { Utils } from '../../structures/Utils';
import { InteractionOption } from '../../structures/InteractionOptions';
import { Command } from '../../managers/Command';

export default new Command({
  name: '파산',
  category: '도박',
  description: '모든 돈과 빚을 0원으로 만들고 한시간동안 도박을 하지 못합니다.',
  execute: async ({ interaction, client }) => {
    const { guildId, user: { id } } = interaction;
    const customIds = Utils.uuid(2)
    const [yes, no] = customIds;

    if (!guildId)
      return;

    const row = <ActionRowBuilder<ButtonBuilder>>new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setLabel(client.messages.yes)
        .setStyle(ButtonStyle.Success)
        .setCustomId(yes),
      new ButtonBuilder()
        .setLabel(client.messages.no)
        .setStyle(ButtonStyle.Danger)
        .setCustomId(no),
    )


    interaction.reply({ content: '정말 파산하시겠습니까? 파산하시면 돈과 빚이 모두 0원으로 돌아가며 한시간동안 도박을 할 수 없습니다.', components: [row] })

    const msg = await interaction.fetchReply();

    client.interactionOptions.set(yes, new InteractionOption({
      ids: [id],
      guildId,
      cmd: 'bankrupcty',
      messages: [msg],
      customIds,
    }));
    client.interactionOptions.set(no, new InteractionOption({
      ids: [id],
      guildId,
      cmd: 'cancel',
      messages: [msg],
      customIds,
    }));
  },
});