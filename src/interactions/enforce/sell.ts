import { ActionRow, ActionRowBuilder, ButtonBuilder, ButtonStyle, GuildMember, SelectMenuBuilder, SelectMenuInteraction } from 'discord.js';
import { Interaction } from '../../managers/Interaction';
import { enforceTable } from '../../structures/games/enforce';
import { InteractionOption } from '../../structures/InteractionOptions';
import { Utils } from '../../structures/Utils';

export default new Interaction<SelectMenuInteraction>({
  name: 'enforce_sell',
  deleted:  false,
  execute: async ({ interaction, options, client }) => {
    if (!options)
      return; 

    const item = options?.data.items.filter((e: { name: string }) => e.name == interaction.values[0])[0];
    const { sell: money } = enforceTable[item.rank - 2];

    const customIds = Utils.uuid(2);
    const [yes, no] = customIds
    const button = <ActionRowBuilder<ButtonBuilder>>new ActionRowBuilder().setComponents(
      new ButtonBuilder()
        .setCustomId(yes)
        .setStyle(ButtonStyle.Success)
        .setLabel('예'),
      new ButtonBuilder()
        .setCustomId(no)
        .setStyle(ButtonStyle.Danger)
        .setLabel('아니오'),
    )
    
    options.messages[0] = await options.messages[0].edit({ content: `정말 "${item.name}"을(를) ${money.toLocaleString()}원에 판매하시겠습니까?`, components: [button] })
    options.data = {
      item,
    }
    client.interactionOptions.set(yes, new InteractionOption(Object.assign({}, options, { cmd: 'enforce_sell_yes' })));
    client.interactionOptions.set(no, new InteractionOption(Object.assign({}, options, { cmd: 'cancel' })));

    interaction.deferUpdate();

    // (await client.models.gambling.updateOne({ id, guildId }, { $pull: { items: item }, $inc: { money } })).matchedCount;

    // if (interaction.member instanceof GuildMember)
    //   interaction.channel?.send(`${interaction.member.displayName}님이 "${item.name}"을(를) ${money.toLocaleString()}원에 판매했습니다!`);
    
    // options?.messages[0].delete();
    // interaction.deferUpdate();
  },
});