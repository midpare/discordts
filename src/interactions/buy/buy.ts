import { ActionRowBuilder, ButtonBuilder, ButtonStyle, SelectMenuInteraction, setPosition } from 'discord.js';
import { Interaction } from '../../managers/Interaction';
import { Buy } from '../../structures/interactions/buy';
import { InteractionOption } from '../../structures/interactions/InteractionOptions';
import { Utils } from '../../structures/Utils';

export default new Interaction<SelectMenuInteraction>({
  name: 'buy',
  deleted: false,
  execute: async ({ interaction, options, client }) => {
    if (!options)
      return;

    const [id, label, moneyStr] = interaction.values[0].split(' ');
    const money = parseFloat(moneyStr)
    const count = options?.data?.buy.count ?? 1;

    const buy = new Buy({ id, label, price: money });

    const customIds = Utils.uuid(4);
    const [yes, countId, backId, cancelId] = customIds;

    const row = <ActionRowBuilder<ButtonBuilder>>new ActionRowBuilder().setComponents(
      new ButtonBuilder()
        .setCustomId(yes)
        .setStyle(ButtonStyle.Primary)
        .setLabel('예'),
      new ButtonBuilder()
        .setCustomId(countId)
        .setStyle(ButtonStyle.Primary)
        .setLabel('수량 변경'),
      new ButtonBuilder()
        .setCustomId(backId)
        .setStyle(ButtonStyle.Primary)
        .setLabel('물품 변경'),
      new ButtonBuilder()
        .setCustomId(cancelId)
        .setStyle(ButtonStyle.Secondary)
        .setLabel('취소'),
    );

    Object.defineProperty(options, 'data', {
      value: {
        buy,
      },
    });
    
    client.interactionOptions.set(yes, new InteractionOption(Object.assign(options, { cmd: 'buy-yes' })));
    client.interactionOptions.set(countId, new InteractionOption(Object.assign(options, { cmd: 'buy-count' })));
    client.interactionOptions.set(backId, new InteractionOption(Object.assign(options, { cmd: 'buy-back' })));
    client.interactionOptions.set(cancelId, new InteractionOption(Object.assign(options, { cmd: 'cancel' })));

    
    options.messages[0].edit({ content: `"${label}" ${count}개를 ${(money * count).toLocaleString()}원(개당 ${money.toLocaleString()}원)에 구매하시겠습니까?.`, components: [row] });
    interaction.deferUpdate();
  },
});