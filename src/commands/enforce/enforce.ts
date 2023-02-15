import { ActionRowBuilder, ButtonBuilder, ButtonStyle, StringSelectMenuBuilder } from 'discord.js';
import { Command } from '../../managers/Command';
import { InteractionOption } from '../../structures/interactions/InteractionOptions';
import { Utils } from '../../structures/Utils';

export default new Command({
  name: '장비강화',
  category: '강화',
  usage: '장비강화',
  description: '자신의 장비를 강화합니다.',
  execute: async ({ interaction, client }) => {
    const { guildId, user: { id } } = interaction;
    const user = await client.models.gambling.findOne({ id, guildId });
    
    if (!user.equipments[0]) {
      Utils.reply(interaction, '보유하고 있는 장비가 없습니다.');
      return 0;
    }
    const selectMenuOptions = user.equipments.map((e: { name: string, rank: number }) => {
      if (e.rank < 10) {
        return {
          label: e.name,
          value: e.name,
          description: `현재 강화 횟수는 ${e.rank}강 입니다.`,
        }; 
      }
    }).filter((e: Object) => e != undefined);
    const menuId = Utils.uuid();

    const selectMenuRow = new ActionRowBuilder<StringSelectMenuBuilder>().setComponents(
      new StringSelectMenuBuilder()
        .setCustomId(menuId)
        .setPlaceholder('여기서 강화장비를 선택하세요')
        .setOptions(selectMenuOptions)
    );

    const buttonRow = new ActionRowBuilder<ButtonBuilder>().setComponents(
      new ButtonBuilder()
        .setCustomId('cancel')
        .setStyle(ButtonStyle.Secondary)
        .setLabel('취소'),
    );

    interaction.reply({ content: '강화할 장비를 선택해주세요.', components: [selectMenuRow, buttonRow] });
    
    const message = await interaction.fetchReply();
    
    setTimeout(() => {
      if (!message.deletable)
        message.delete();
    }, 10 * 60 * 1000);
    
    client.interactionOptions.set(menuId, new InteractionOption({
      ids: [id],
      guildId: guildId!,
      message, 
      cmd: 'select enforce',
      customIds: [menuId],
      data: null
    }));

    return 1;
  },
});