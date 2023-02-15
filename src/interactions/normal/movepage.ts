import { ButtonInteraction, APISelectMenuOption, ActionRowBuilder, ButtonBuilder, ButtonStyle, StringSelectMenuBuilder, MessageEditOptions } from 'discord.js';
import { Interaction } from '../../managers/Interaction';
import { InteractionOption } from '../../structures/interactions/InteractionOptions';
import { Utils } from '../../structures/Utils';

export default new Interaction<ButtonInteraction, {
  box: Array<APISelectMenuOption[]>,
  present: number,
  messageOption: MessageEditOptions,
  menuOption: InteractionOption<unknown>,
}>({
  name: 'move page',
  execute: async ({ interaction, options, client }) => {
    switch(interaction.component.label) {
      case '이전 페이지':
        if (options.data.present < 1) {
          options.data.present = options.data.box.length;
        }
        options.data.present -= 1;
        break;
      case '다음 페이지':
        options.data.present += 1;
        if (options.data.box.length <= options.data.present) {
          options.data.present = 0;
        }
        break;
    }

    const { message: messages, data: { box, present, messageOption, menuOption } } = options;
    
    const customIds = Utils.uuid(3);
    const [menuId, nextId, previousId] = customIds;

    interaction.deferUpdate();
      
    const menu = new ActionRowBuilder<StringSelectMenuBuilder>().setComponents(
      new StringSelectMenuBuilder()
        .setCustomId(menuId)
        .setPlaceholder('이곳을 눌러 선택하세요')
        .setOptions(box[present]),
    );

    const button = new ActionRowBuilder<ButtonBuilder>().setComponents(
      new ButtonBuilder()
        .setCustomId(previousId)
        .setStyle(ButtonStyle.Primary)
        .setLabel('이전 페이지'),
      new ButtonBuilder()
        .setCustomId(nextId)
        .setStyle(ButtonStyle.Primary)
        .setLabel('다음 페이지'),
      new ButtonBuilder()
        .setCustomId('cancel')
        .setStyle(ButtonStyle.Secondary)
        .setLabel('취소'),
    );

    messages.edit(Object.assign(messageOption, { components: [menu, button] }));

    client.interactionOptions.set(menuId, new InteractionOption(menuOption));
    client.interactionOptions.set(nextId, options);
    client.interactionOptions.set(previousId, options);
  },
});