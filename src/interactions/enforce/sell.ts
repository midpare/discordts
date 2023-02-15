import { ActionRowBuilder, ButtonBuilder, ButtonStyle, StringSelectMenuInteraction } from 'discord.js';
import { Interaction } from '../../managers/Interaction';
import { enforceTable, Equipment } from '../../structures/interactions/enforce';
import { InteractionOption } from '../../structures/interactions/InteractionOptions';
import { Utils } from '../../structures/Utils';


export default new Interaction<StringSelectMenuInteraction, Array<Equipment>>({
  name: 'enforce sell',
  execute: async ({ interaction, options, client }) => {
    const equipment = options.data.filter((e: { name: string }) => e.name == interaction.values[0])[0];
    const { sell: money } = enforceTable[equipment.rank - 2];

    const customIds = Utils.uuid(2);
    const [yes, no] = customIds
    const button = new ActionRowBuilder<ButtonBuilder>().setComponents(
      new ButtonBuilder()
        .setCustomId(yes)
        .setStyle(ButtonStyle.Success)
        .setLabel('예'),
      new ButtonBuilder()
        .setCustomId(no)
        .setStyle(ButtonStyle.Danger)
        .setLabel('아니오'),
    )
    
    options.message = await options.message.edit({ content: `정말 "${equipment.name}"을(를) ${money.toLocaleString()}원에 판매하시겠습니까?`, components: [button] })
    client.interactionOptions.set(yes, new InteractionOption(Object.assign({}, options, { cmd: 'enforce sell yes', data: equipment })));
    client.interactionOptions.set(no, new InteractionOption(Object.assign({}, options, { cmd: 'cancel' })));

    interaction.deferUpdate();
  },
});