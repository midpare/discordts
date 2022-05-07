import { MessageEmbed } from 'discord.js';
import { Command } from '../../managers/Commands';

export default new Command({
  name: 'help',
  aliases: ['도움말', '명령어'],
  category: '기본',
  usage: 'help [카테고리]',
  description: '봇의 명령어를 확인합니다.',
  execute: async ({ msg, args, client }) => {
    const embed = new MessageEmbed()
    const prefix = process.env.PREFIX

    const directories = [...new Set(client.commands.map((command: Command) => command.category))]
    const categories = new Map();
    for (const category of directories) {
      const getCommands = new Set(client.commands
        .filter((commands: Command) => commands.category == category)
        .map((command: Command) => command.name)
      );
      categories.set(category, [...getCommands]);
    }
    const commands = categories.get(args[0]);

    if (!commands) {
      embed
        .setTitle('명령어')
        .setDescription('명령어 카테고리를 확인합니다.');
      for (const category of directories) {
        embed
          .addField(`${prefix}help ${category}`, `${category} 관련 명령어를 확인합니다.`, false);
      }
      msg.channel.send({ embeds: [embed] });
    } else {
      embed
        .setTitle(`${args[0]} 명령어`)
        .setDescription(`${args[0]} 관련 명령어를 확인합니다.\n<>는 필수, []는 선택사항 입니다.`);
      for (const element of commands) {
        const command = client.commands.get(element);
        if (command) {
          const aliases = command.aliases ? `\n동의어: ${command.aliases}` : '';
          embed
            .addField(`${prefix}${command.usage}`, `${command.description}${aliases}`, false);
        }
      }
      msg.channel.send({ embeds: [embed] });
    }

  },
});

