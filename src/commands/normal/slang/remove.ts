import { ApplicationCommandOptionType, TextChannel, ActionRowBuilder, StringSelectMenuBuilder, ButtonBuilder, ButtonStyle, CommandInteractionOptionResolver } from 'discord.js';
import nextPage from '../../../interactions/nextPage';
import { Command } from '../../../managers/Command';
import { InteractionOption } from '../../../structures/interactions/InteractionOptions';
import { Utils } from '../../../structures/Utils';

export default new Command({
  name: '망언삭제',
  category: '기본',
  usage: '망언삭제 <유저> <망언>',
  description: '유저의 망언을 삭제합니다.',
  options: [
    {
      name: '유저',
      description: '망언을 삭제할 유저를 입력합니다.',
      type: ApplicationCommandOptionType.User,
      required: true,
    },
  ],
  execute: async ({ interaction, options, client }) => {
    const target = options.getUser('유저', true);

    const { user: { id }, guildId } = interaction;
    const { id: targetId } = target;

    if (!guildId)
      return 0;

    const guild = await client.models.guild.findOne({ id: guildId });
    const channel = <TextChannel>interaction.guild?.channels.cache.get(guild.slang);

    if (!channel) {
      Utils.reply(interaction, '망언 채널을 등록해주시기 바랍니다.');
      return 0;
    }

    if (id == targetId) {
      Utils.reply(interaction, '자신의 망언을 삭제할 수 없습니다.');
      return 0;
    }

    const user = await client.models.config.findOne({ id: targetId, guildId });
    if (user.slangs.length < 1) {
      Utils.reply(interaction, '이 유저는 삭제할 망언이 없습니다.');
      return 0;
    }
    
    const box = Utils.packing(user.slangs, 25);

    const customIds = Utils.uuid(3);
    const [menuId, nextId, previousId] = customIds;

    const selectMenuOptions = new Array();
    for (const i in box[0]) {
      const option = {
        label: `${parseInt(i) + 1}번 망언`,
        description: box[0][i],
        value: box[0][i],
      };
      selectMenuOptions.push(option);
    }

    const message = (await channel.messages.fetch()).filter(m => m.embeds[0].data.title?.split('(')[1].split(')')[0] == targetId);

    const menu = <ActionRowBuilder<StringSelectMenuBuilder>>new ActionRowBuilder().setComponents(
      new StringSelectMenuBuilder()
        .setCustomId(menuId)
        .setPlaceholder('이곳을 눌러 선택하세요')
        .setOptions(selectMenuOptions),
    );

    const button = <ActionRowBuilder<ButtonBuilder>>new ActionRowBuilder().setComponents(
      new ButtonBuilder()
        .setCustomId(previousId)
        .setStyle(ButtonStyle.Primary)
        .setLabel('이전 페이지'),
      new ButtonBuilder()
        .setCustomId(nextId)
        .setStyle(ButtonStyle.Primary)
        .setLabel('다음 페이지'),
      new ButtonBuilder()
        .setCustomId('cancel')
        .setStyle(ButtonStyle.Secondary)
        .setLabel('취소'),
    );

    interaction.reply({ content: '삭제할 망언을 선택해주세요', components: [menu, button] });
    const fetchMessage = await interaction.fetchReply();
    const defaultOption = {
      ids: [id],
      guildId,
      customIds,
      messages: [fetchMessage],
    };

    client.interactionOptions.set(menuId, new InteractionOption(Object.assign({}, defaultOption, {
      cmd: 'delete slang',
      data: {
        id: targetId,
        message,
      },
    })));

    // for (const [_, message] of messages) {
    //   if (message.embeds.length < 1)
    //     continue;

    //   const messageId = message.embeds[0].data.title?.split('(')[1].split(')')[0]

    //   if (messageId == target.id) {
    //     const box = Utils.packing(user.slangs, 25);

    //     const customIds = Utils.uuid(4);
    //     const [menuId, nextId, previousId, cancelId] = customIds;

    //     const selectMenuOptions = new Array();
    //     for (const i in box[0]) {
    //       const option = {
    //         label: `${parseInt(i) + 1}번 망언`,
    //         description: box[0][i],
    //         value: box[0][i],
    //       };
    //       selectMenuOptions.push(option);
    //     }

    //     const menu = <ActionRowBuilder<StringSelectMenuBuilder>>new ActionRowBuilder().setComponents(
    //       new StringSelectMenuBuilder()
    //         .setCustomId(menuId)
    //         .setPlaceholder('이곳을 눌러 선택하세요')
    //         .setOptions(selectMenuOptions),
    //     );

    //     const button = <ActionRowBuilder<ButtonBuilder>>new ActionRowBuilder().setComponents(
    //       new ButtonBuilder()
    //         .setCustomId(previousId)
    //         .setStyle(ButtonStyle.Primary)
    //         .setLabel('이전 페이지'),
    //       new ButtonBuilder()
    //         .setCustomId(nextId)
    //         .setStyle(ButtonStyle.Primary)
    //         .setLabel('다음 페이지'),
    //       new ButtonBuilder()
    //         .setCustomId(cancelId)
    //         .setStyle(ButtonStyle.Secondary)
    //         .setLabel('취소'),
    //     );

    //     interaction.reply({ content: '삭제할 망언을 선택해주세요', components: [menu, button] });
    //     const fetchMessage = await interaction.fetchReply();
    //     const defaultOption = {
    //       ids: [id],
    //       guildId,
    //       customIds,
    //       messages: [fetchMessage],
    //     };

    //     client.interactionOptions.set(menuId, new InteractionOption(Object.assign({}, defaultOption, {
    //       cmd: 'delete slang',
    //       data: {
    //         message,
    //         id: targetId,
    //       },
    //     })));
    //     client.interactionOptions.set(nextId, new InteractionOption(Object.assign({}, defaultOption, {
    //       cmd: 'next page',
    //       data: {
    //         message,
    //         id: targetId,
    //       },
    //     })));


    //     break;
    //   }
    // }

    return 1;
  },
});