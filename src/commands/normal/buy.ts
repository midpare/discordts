import { ButtonBuilder } from '@discordjs/builders';
import { ActionRowBuilder, ButtonStyle, SelectMenuBuilder } from 'discord.js';
import { Command } from '../../managers/Command';
import { InteractionOption } from '../../structures/interactions/InteractionOptions';
import { Utils } from '../../structures/Utils';

const items = [
  {
    id: 'protection',
    label: '파괴방지권',
    price: 750000,
    description: '장비 강화 시 파괴를 막을 수 있습니다.',
  },
]

export default new Command({
  name: '구매',
  category: '기본',
  usage: '구매',
  description: '여러가지 물품들을 구매합니다.',
  execute: async ({ interaction, client }) => {
    const customIds = Utils.uuid(3);
    const [menuId, countId, cancelId] = customIds;

    const menuOptions = new Array();

    for (const k in items) {
      const { id, label, price, description } = items[k];
      const option = {
        label: label,
        value: `${id} ${label} ${price}`,
        description,
      }
      menuOptions.push(option)
    }

    const selectMenu = <ActionRowBuilder<SelectMenuBuilder>> new ActionRowBuilder().setComponents(
      new SelectMenuBuilder()
        .setCustomId(menuId)
        .setPlaceholder('여기에서 구매하고 싶은 물품을 선택해주세요.')
        .setOptions(menuOptions)
    );

    const button = <ActionRowBuilder<ButtonBuilder>>new ActionRowBuilder().setComponents(
      new ButtonBuilder()
        .setCustomId(cancelId)
        .setStyle(ButtonStyle.Secondary)
        .setLabel('취소'),
    );
    
    interaction.reply({ content: '구매하고 싶은 물품을 선택해주세요', components: [selectMenu, button] });

    const message = await interaction.fetchReply();

    setTimeout(() => {
      if (!message.deletable)
        message.delete();
    }, 5 * 60 * 1000);

    const defaultOption = {
      ids: [interaction.user.id],
      guildId: interaction.guildId!,
      messages: [message],
      customIds,
      data: null,
    }

    client.interactionOptions.set(menuId, new InteractionOption(Object.assign({}, defaultOption, { cmd: 'buy' })));
    client.interactionOptions.set(countId, new InteractionOption(Object.assign({}, defaultOption, { cmd: 'buy-count' })));
    client.interactionOptions.set(cancelId, new InteractionOption(Object.assign({}, defaultOption, { cmd: 'cancel' } )));

    return 1;
  },
});