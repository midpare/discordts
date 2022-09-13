import { ApplicationCommandOptionType, EmbedBuilder } from 'discord.js';
import { Command } from '../../managers/Command';

export default new Command({
  name: 'help',
  aliases: ['도움말', '명령어'],
  category: '기본',
  usage: 'help [카테고리]',
  description: '봇의 명령어를 확인합니다.',
  options: [
    {
      name: '카테고리',
      description: '명령어 카테고리를 입력합니다.',
      type: ApplicationCommandOptionType.String,
      required: false,
    }
  ],
  execute: async ({ interaction, options, client }) => {
    const embed = new EmbedBuilder();

    const directories = [...new Set(client.commands.map(command => command.category).filter(category => category != undefined))];
    const categories = new Map();
    for (const category of directories) {
      const getCommands = new Set(client.commands
        .filter(commands => commands.category == category)
        .map(command => command.name)
      );
      categories.set(category, [...getCommands]);
    }

    const category = options.getString('카테고리');
    const commands = categories.get(category);
    
    if (!commands) {
      embed
        .setTitle('명령어')
        .setDescription('명령어 카테고리를 확인합니다.');
      for (const category of directories) {
        embed
          .addFields({ name: `/help ${category}`, value: `${category} 관련 명령어를 확인합니다.`, inline: false });
      }
      interaction.reply({ embeds: [embed] });
    } else {
      embed
        .setTitle(`${category} 명령어`)
        .setDescription(`${category} 관련 명령어를 확인합니다.\n<>는 필수, []는 선택사항 입니다.`);
      for (const element of commands) {
        const command = client.commands.get(element);
        if (command) {
          embed
            .addFields({ name: '/' + command.usage, value: command.description, inline: false });
        }
      }
      interaction.reply({ embeds: [embed] });
    }
    return 1;
  },
});

