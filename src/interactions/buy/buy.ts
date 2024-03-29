import { ActionRowBuilder, ButtonBuilder, ButtonStyle, StringSelectMenuInteraction } from 'discord.js';
import { Interaction } from '../../managers/Interaction';
import { Buy } from '../../structures/interactions/buy';
import { InteractionOption } from '../../structures/interactions/InteractionOptions';
import { Utils } from '../../structures/Utils';

export default new Interaction<StringSelectMenuInteraction, Buy | null>({
  name: 'buy',
  execute: async ({ interaction, options, client }) => {
    const [id, label, priceStr] = interaction.values[0].split(' ');
    const price = parseFloat(priceStr)
    const count = options.data?.count ?? 1;
    if (options.data == null) {
      const buy = new Buy(client, { id, label, price }, options);      
      options.data = buy;
    }

    const customIds = Utils.uuid(3);
    const [yes, countId, backId] = customIds;

    const row = new ActionRowBuilder<ButtonBuilder>().setComponents(
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
        .setCustomId('cancel')
        .setStyle(ButtonStyle.Secondary)
        .setLabel('취소'),
    );
    
    client.interactionOptions.set(yes, new InteractionOption(Object.assign(options, { cmd: 'buy-yes' })));
    client.interactionOptions.set(countId, new InteractionOption(Object.assign(options, { cmd: 'buy-count' })));
    client.interactionOptions.set(backId, new InteractionOption(Object.assign(options, { cmd: 'buy-back' })));
    
    options.data.send({ content: `"${label}" ${count}개를 ${(price * count).toLocaleString()}원(개당 ${price.toLocaleString()}원)에 구매하시겠습니까?.`, components: [row] });
    interaction.deferUpdate();
  },
});