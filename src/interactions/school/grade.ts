import { ActionRowBuilder, ButtonBuilder, ButtonStyle, SelectMenuBuilder, SelectMenuInteraction } from 'discord.js';
import { Interaction } from '../../managers/Interaction';
import { InteractionOption } from '../../structures/InteractionOptions';
import { Utils } from '../../structures/Utils';

export default new Interaction<SelectMenuInteraction>({
  name: 'grade',
  deleted: true,
  execute: async ({ interaction, options, client }) => {
    if (!options)
      return;
    const customIds = Utils.uuid(3);
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
    
    const selectMenu = <ActionRowBuilder<SelectMenuBuilder>>new ActionRowBuilder().addComponents(
      new SelectMenuBuilder()
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
    )

    interaction.reply({ content: '자신의 학년을 선택해주시기 바랍니다.', components: [ selectMenu, button ] });
    
    const message = await interaction.fetchReply();
    
    options.messages = [message];
    options.customIds = customIds;

    client.interactionOptions.set(menuId, InteractionOption.getNext(options, {
      cmd: 'class',
      data: JSON.parse(interaction.values[0])
    }));

    client.interactionOptions.set(cancel, InteractionOption.getNext(options, {
      cmd: 'cancel',
    }));

    client.interactionOptions.set(back, InteractionOption.getNext(options, {
      cmd: 'back',
    }));
  },
});