import { ActionRowBuilder, ButtonBuilder, ButtonStyle, SelectMenuBuilder } from 'discord.js';
import { Command } from '../../managers/Command';
import { InteractionOption } from '../../structures/InteractionOptions';
import { Utils } from '../../structures/Utils';

export default new Command({
  name: '강화',
  category: '강화',
  usage: '강화',
  description: '자신의 장비를 강화합니다.',
  execute: async ({ interaction, client }) => {
    const { guildId, user: { id } } = interaction;
    const user = await client.models.gambling.findOne({ id, guildId });
    
    if (!user.items[0]) {
      Utils.reply(interaction, '보유하고 있는 장비가 없습니다.');
      return 0;
    }
    const SelectMenuOptions = user.items.map((e: { name: string, rank: number }) => {
      return {
        label: e.name,
        value: e.name,
        description: `현재 강화 횟수는 ${e.rank}강 입니다.`,
      }; 
    });

    const customIds = Utils.uuid(2)
    const [ selectMenuId, cancelId ] = customIds

    const selectMenuRow = <ActionRowBuilder<SelectMenuBuilder>>new ActionRowBuilder().setComponents(
      new SelectMenuBuilder()
        .setCustomId(selectMenuId)
        .setPlaceholder('여기서 강화장비를 선택하세요')
        .setOptions(SelectMenuOptions)
    );

    const buttonRow = <ActionRowBuilder<ButtonBuilder>>new ActionRowBuilder().setComponents(
      new ButtonBuilder()
        .setCustomId(cancelId)
        .setStyle(ButtonStyle.Secondary)
        .setLabel('취소'),
    )

    interaction.reply({ content: '강화할 장비를 선택해주세요.', components: [selectMenuRow, buttonRow] });
    
    const message = await interaction.fetchReply();

    const defaultOption = {
      ids: [id],
      guildId: guildId!,
      messages: [message], 
      customIds: [selectMenuId],
    }
    client.interactionOptions.set(selectMenuId, new InteractionOption(Object.assign({}, { cmd: 'select_enforce' }, defaultOption)));
    client.interactionOptions.set(cancelId, new InteractionOption(Object.assign({}, { cmd: 'cancel'}, defaultOption)));

    return 1;
  },
});