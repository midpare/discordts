import { ActionRow, ActionRowBuilder, ApplicationCommandOptionType, ButtonBuilder, ButtonStyle, Colors, EmbedBuilder, SelectMenuBuilder } from 'discord.js';
import { Command } from '../../managers/Command';
import { InteractionOption } from '../../structures/interactions/InteractionOptions';
import { Utils } from '../../structures/Utils';

export default new Command({
  name: 'help',
  aliases: ['도움말', '명령어'],
  category: '기본',
  usage: 'help [카테고리]',
  description: '봇의 명령어를 확인합니다.',
  execute: async ({ interaction, client }) => {
    const { guildId, user: { id } } = interaction;

    if (!guildId)
      return 0;

    const directories = [...new Set(client.commands.map(command => command.category).filter(category => category != undefined))];

    const menuOptions = new Array();
    const categories = new Map();

    for (const category of directories) {
      const option = {
        label: category,
        description: `${category} 카테고리를 선택합니다.`,
        value: category
      }
      menuOptions.push(option)

      const commands = new Set(client.commands
        .filter(commands => commands.category == category)
        .map(command => {
          return {
            name: command.usage,
            description: command.description
          }
        })
      );
      categories.set(category, commands)
    }

    const customIds = Utils.uuid(2);
    const [menuId, cancelId] = customIds;
    const menu = <ActionRowBuilder<SelectMenuBuilder>>new ActionRowBuilder().setComponents(
      new SelectMenuBuilder()
        .setCustomId(menuId)
        .setPlaceholder('이곳에서 카테고리를 선택하세요')
        .setOptions(menuOptions)
    );

    const button = <ActionRowBuilder<ButtonBuilder>>new ActionRowBuilder().setComponents(
      new ButtonBuilder()
        .setCustomId(cancelId)
        .setStyle(ButtonStyle.Secondary)
        .setLabel('종료'),
    );

    const embed = new EmbedBuilder()
      .setDescription('카테고리를 선택해주세요')
      .setColor(Colors.Red);

    interaction.reply({ embeds: [embed], components: [menu, button] });

    const msg = await interaction.fetchReply();

    const defaultOption = {
      ids: [id],
      guildId,
      messages: [msg],
      customIds,
      data: {
        categories
      },
    }


    client.interactionOptions.set(menuId, Object.assign({}, defaultOption, { cmd: 'help' }));
    client.interactionOptions.set(cancelId, Object.assign({}, defaultOption, { cmd: 'cancel' }));
    return 1;
  },
});

