import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';
import { Utils } from '../../structures/Utils';
import { InteractionOption } from '../../structures/interactions/InteractionOptions';
import { Command } from '../../managers/Command';

export default new Command({
  name: '파산',
  category: '도박',
  usage: '파산',
  description: '모든 돈과 빚을 0원으로 만들고 한시간동안 도박을 하지 못합니다.',
  execute: async ({ interaction, client }) => {
    const { guildId, user: { id } } = interaction;
    const customIds = Utils.uuid(2)
    const [yes, no] = customIds;

    if (!guildId)
      return 0;

    const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
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
    
    const message = await interaction.fetchReply();
    
    setTimeout(() => {
      if (!message.deletable) 
        message.delete();
    }, 60 * 1000);

    const defaultOption = {
      ids: [id],
      guildId,
      message,
      customIds,
      data: null
    }

    client.interactionOptions.set(yes, new InteractionOption(Object.assign({}, defaultOption, { cmd: 'bankrupcty'})));
    client.interactionOptions.set(no, new InteractionOption(Object.assign({}, defaultOption, { cmd: 'cancel' })));
    
    return 1;
  },
});