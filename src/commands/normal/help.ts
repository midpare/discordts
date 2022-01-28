import { MessageEmbed } from 'discord.js';
import { client } from '../../structures/Client';
import { Command } from '../../structures/Commands';
import { CommandType } from '../../util/typings/command';


export default new Command({
  name: 'help',
  aliases: ['도움말', '명령어'],
  category: '기본',
  usage: 'help [카테고리]',
  description: '봇의 명령어를 확인합니다.',
  execute: async ({ msg, args }) => {
    const embed = new MessageEmbed()
    const prefix = process.env.PREFIX

    const directories = [...new Set(client.commands.map((command: CommandType) => command.category))]
    const categories = new Map();
    for (const category of directories) {
      const getCommands = new Set(client.commands
        .filter((commands: CommandType) => commands.category == category)
        .map(command => {
          return {
            usage: command.usage,
            aliases: command.aliases,
            description: command.description,
          };
        }));
      console.log(getCommands)
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
      return;
    }

    embed
      .setTitle(`${args[0]} 명령어`)
      .setDescription(`${args[0]} 관련 명령어를 확인합니다.\n<>는 필수, []는 선택사항 입니다.`);
    for (const command of commands) {
      const value = command.aliases ? `${command.description}\n동의어: ${command.aliases.join(', ')}` : `${command.description}`
      embed
        .addField(`${prefix}${command.usage}`, value , false);
    }
    msg.channel.send({ embeds: [embed] });
  },
});

