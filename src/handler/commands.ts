import { Collection } from 'discord.js';
import { glob } from 'glob';
import { promisify } from 'util';
import { ExtendClient } from '../structures/Client';
import { CommandType } from '../util/typings/command';

const globPromise = promisify(glob);

export = async function (client: ExtendClient) {
  const mainCommandFiles = await globPromise(`${__dirname}/../commands/mainCommands/**/*{.ts,.js}`);
  for (const dir of mainCommandFiles) {
    const file: CommandType = (await import(dir)).default;
    if (client.mainCommands.get(file.name))
      throw `command name duplicate! command path: ${dir}, command name: ${file.name}`;
    try {
      client.mainCommands.set(file.name, file);
      if (file.aliases) {
        for (const fileName of file.aliases) {
          if (client.mainAliases.get(fileName))
            throw `command name duplicate! command path: ${dir}, command aliases: ${fileName}`;
          client.mainAliases.set(fileName, file);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  const subCommandFiles = await globPromise(`${__dirname}/../commands/subCommands/**/*{.ts,.js}`);
  for (const dir of subCommandFiles) {
    const file: CommandType = (await import(dir)).default;
    const commands: Collection<string, CommandType> = new Collection();
    const aliases: Collection<string, CommandType> = new Collection();
    if (!file.category)
      throw `there is no category in subCommands command path: ${dir}`;
    commands.set(file.name, file);
    try {
      if (client.subCommands.get(file.category)) {
        if (client.subCommands.get(file.category)?.get(file.name))
          throw `subcommand name duplicate! subcommand path: ${dir}, subcommand category: ${file.category}, subcommand name: ${file.name}`;
        client.subCommands.get(file.category)?.set(file.name, file);
      } else {
        client.subCommands.set(file.category, commands);
      }

      if (file.aliases) {
        for (const fileName of file.aliases) {
          aliases.set(fileName, file);
          if (client.subAliases.get(file.category)) {
            if (client.subCommands.get(file.category)?.get(fileName))
              throw `subcommand name duplicate! subcommand path: ${dir}, subcommand cateogory: ${file.category}, subcommand name: ${fileName}`;
            client.subAliases.get(file.category)?.set(fileName, file);
          } else {
            client.subAliases.set(file.category, aliases);
          }
        }
      }
    } catch (error) {
      console.error(error);
    }
  }
}