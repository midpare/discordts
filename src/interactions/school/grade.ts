import { ActionRowBuilder, ButtonBuilder, ButtonStyle, StringSelectMenuBuilder, StringSelectMenuInteraction } from 'discord.js';
import { Interaction } from '../../managers/Interaction';
import { School } from '../../structures/interactions/school';
import { Utils } from '../../structures/Utils';

export default new Interaction<StringSelectMenuInteraction, School>({
  name: 'grade',
  execute: async ({ interaction, options, client }) => {
    const customIds = Utils.uuid(3)
    const [menuId, cancel, back] = customIds;

    const menuOptions = new Array();
    for (let i = 1; i < 4; i++) {
      const option = {
        label: `${i}학년`,
        description: `${i}학년을 선택합니다`,
        value: `${i}`,
      };
      menuOptions.push(option);
    }
    
    const selectMenu = <ActionRowBuilder<StringSelectMenuBuilder>>new ActionRowBuilder().addComponents(
      new StringSelectMenuBuilder()
        .setCustomId(menuId)
        .setPlaceholder('이곳을 눌러 선택해주세요')
        .setOptions(menuOptions)
    );

    const button = <ActionRowBuilder<ButtonBuilder>>new ActionRowBuilder().addComponents(
      new ButtonBuilder() 
        .setCustomId(cancel)
        .setStyle(ButtonStyle.Secondary)
        .setLabel('취소'),
      new ButtonBuilder() 
        .setCustomId(back)
        .setStyle(ButtonStyle.Secondary)
        .setLabel('뒤로가기')
    );

    options.messages[0].edit({ content: '자신의 학년을 선택해주시기 바랍니다.', components: [ selectMenu, button ] });
    interaction.deferUpdate();
    
    options.customIds = customIds;
    options.data = new School(Object.assign({}, options.data, JSON.parse(interaction.values[0])));

    client.interactionOptions.set(menuId, Object.assign({}, options, { cmd: 'class' }));
    client.interactionOptions.set(cancel, Object.assign({}, options, { cmd: 'cancel' }));
    client.interactionOptions.set(back, Object.assign({}, options, { cmd: 'back' }));
  },
});