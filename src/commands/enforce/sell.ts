import { ActionRowBuilder, ButtonBuilder, ButtonStyle, StringSelectMenuBuilder } from 'discord.js';
import { Command } from '../../managers/Command';
import { InteractionOption } from '../../structures/interactions/InteractionOptions';
import { Utils } from '../../structures/Utils';
import { enforceTable } from '../../structures/interactions/enforce';

export default new Command({
  name: '장비판매',
  category: '강화',
  usage: '장비판매 <이름>',
  description: '현재 제작한 장비를 판매합니다.',
  execute: async ({ interaction, client }) => {
    const { guildId, user: { id } } = interaction;

    const user = await client.models.gambling.findOne({ id, guildId })
    
    const menuId = Utils.uuid();
    
    const selectMenuOptions = user.equipments.map((equipment: { name: string, rank: number }) => {
      if (equipment.rank > 1) {
        const { sell } = enforceTable[equipment.rank - 2]
        return {
          label: equipment.name,
          value: equipment.name,
          description: `이 장비의 판매비용은 ${sell.toLocaleString()}원입니다.`,
        };
      }
    }).filter((e: Object) => e != undefined);
    
    
    if (!selectMenuOptions[0]) {
      Utils.reply(interaction, '판매 가능한 장비가 없습니다.');
      return 0;
    }

    const selectMenu = new ActionRowBuilder<StringSelectMenuBuilder>().setComponents(
      new StringSelectMenuBuilder()
        .setCustomId(menuId)
        .setPlaceholder('이곳에서 판매할 아이템을 선택해주세요.')
        .setOptions(selectMenuOptions)
    );

    const button = new ActionRowBuilder<ButtonBuilder>().setComponents(
      new ButtonBuilder()
        .setCustomId('cancel')
        .setStyle(ButtonStyle.Secondary)
        .setLabel('취소'),
    );

    interaction.reply({ content: `판매하고 싶은 장비를 선택해주세요.`, components: [selectMenu, button] });

    const message = await interaction.fetchReply();

    setTimeout(() => {
      if (!message.deletable)
        message.delete();
    }, 60 * 1000);

    client.interactionOptions.set(menuId, new InteractionOption({
      ids: [id],
      guildId: guildId!,
      cmd: 'enforce sell',
      customIds: [menuId],
      message,
      data: user.equipments,
    }));

    return 1;
  },
});