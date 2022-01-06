import { MessageEmbed } from "discord.js";
import { client } from "../../../structures/Client";
import { Command } from "../../../structures/Commands";


export default new Command({
  name: 'help',
  aliases: ['도움말', '명령어'],
  category: '기본',
  usage: 'help <카테고리>',
  description: '봇의 명령어를 확인합니다.',
  execute: async ({ msg, args }) => {
    const directories = [...new Set(client.mainCommands.map((command: { category: string }) => command.category))]
    const embed = new MessageEmbed()
    const prefix = process.env.PREFIX
    const categories = new Map();
    for (const category of directories) {
      const subCommands = client.subCommands.get(category);
      if (subCommands) {
        const getSubCommands = subCommands.map((subCommand: { usage: string, description: string }) => {
          return {
            usage: subCommand.usage,
            description: subCommand.description,
          };
        });
        categories.set(category, getSubCommands);
        continue;
      }
      const getMainCommands = client.mainCommands
        .filter((commands: { category: string }) => commands.category == category)
        .map(command => {
          return {
            usage: command.usage,
            description: command.description,
          };
        });
      categories.set(category, getMainCommands);
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
      .setDescription(`${args[0]} 관련 명령어를 확인합니다.`);
    for (const command of commands) {
     embed
        .addField(`${prefix}${command.usage}`, `${command.description}`, false);
    }
    msg.channel.send({ embeds: [embed] });
  }
});

