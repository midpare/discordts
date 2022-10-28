import { ActionRowBuilder, ApplicationCommandOptionType, ButtonBuilder, ButtonStyle, SelectMenuBuilder } from 'discord.js';
import { Command } from '../../managers/Command';
import { InteractionOption } from '../../structures/InteractionOptions';
import { Utils } from '../../structures/Utils';
import { enforceTable } from '../../structures/games/enforce';

export default new Command({
  name: '판매',
  category: '강화',
  usage: '판매 <이름>',
  description: '현재 제작한 장비를 판매합니다.',
  execute: async ({ interaction, client }) => {
    const { guildId, user: { id } } = interaction;

    const user = await client.models.gambling.findOne({ id, guildId })

    if (!user.items[0]) {
      Utils.reply(interaction, '보유한 장비가 없습니다.');
      return 0;
    }
    const customIds = Utils.uuid(2);
    const [menuId, cancelId] = customIds;

    const selectMenuOptions: Array<any> = user.items.map((item: { name: string, rank: number }) => {
      if (item.rank > 1) {
        const { sell } = enforceTable[item.rank - 2]
        return {
          label: item.name,
          value: item.name,
          description: `이 장비의 판매비용은 ${sell.toLocaleString()}원입니다.`,
        };
      }
    }).filter((e: Object) => e != undefined);


    const selectMenu = <ActionRowBuilder<SelectMenuBuilder>>new ActionRowBuilder().setComponents(
      new SelectMenuBuilder()
        .setCustomId(menuId)
        .setPlaceholder('이곳에서 판매할 아이템을 선택해주세요.')
        .setOptions(selectMenuOptions)
    );

    const button = <ActionRowBuilder<ButtonBuilder>>new ActionRowBuilder().setComponents(
      new ButtonBuilder()
        .setCustomId(cancelId)
        .setStyle(ButtonStyle.Secondary)
        .setLabel('취소'),
    );

    interaction.reply({ content: `판매하고 싶은 장비를 선택해주세요.`, components: [selectMenu, button] });

    const message = await interaction.fetchReply();

    setTimeout(() => {
      if (!message.deletable)
        message.delete();
    }, 60 * 1000);

    const defaultOption = {
      ids: [id],
      guildId: guildId!,
      messages: [message],
      customIds,
      data: {
        items: user.items
      }
    }

    client.interactionOptions.set(menuId, new InteractionOption(Object.assign({}, { cmd: 'enforce_sell' }, defaultOption)));
    client.interactionOptions.set(cancelId, new InteractionOption(Object.assign({}, { cmd: 'cancel' }, defaultOption)));

    return 1;
  },
});