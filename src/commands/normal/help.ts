import { ActionRow, ActionRowBuilder, ApplicationCommandOptionType, Colors, EmbedBuilder, SelectMenuBuilder } from 'discord.js';
import { Command } from '../../managers/Command';
import { InteractionOption } from '../../structures/InteractionOptions';
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

    const customId = Utils.uuid()
    const row = <ActionRowBuilder<SelectMenuBuilder>>new ActionRowBuilder().addComponents(
      new SelectMenuBuilder()
        .setCustomId(customId)
        .setPlaceholder('이곳에서 카테고리를 선택하세요')
        .setOptions(menuOptions)
    )

    const embed = new EmbedBuilder()
      .setDescription('카테고리를 선택해주세요')
      .setColor(Colors.Red);

    interaction.reply({ embeds: [embed], components: [row] });

    const msg = await interaction.fetchReply()
    client.interactionOptions.set(customId, new InteractionOption({
      ids: [id],
      guildId,
      cmd: 'help',
      messages: [msg],
      customIds: [customId],
      data: {
        categories
      },
    }));
    // if (!commands) {
    //   embed
    //     .setTitle('명령어')
    //     .setDescription('명령어 카테고리를 확인합니다.');
    //   for (const category of directories) {
    //     embed
    //       .addFields({ name: `/help ${category}`, value: `${category} 관련 명령어를 확인합니다.`, inline: false });
    //   }
    //   interaction.reply({ embeds: [embed] });
    // } else {
    //   embed
    //     .setTitle(`${category} 명령어`)
    //     .setDescription(`${category} 관련 명령어를 확인합니다.\n<>는 필수, []는 선택사항 입니다.`);
    //   for (const element of commands) {
    //     const command = client.commands.get(element);
    //     if (command) {
    //       embed
    //         .addFields({ name: '/' + command.usage, value: command.description, inline: false });
    //     }
    //   }
    //   interaction.reply({ embeds: [embed] });
    // }
    return 1;
  },
});

