import { REST, Routes } from 'discord.js';
import { Client } from '../structures/Client';
import { Utils } from '../structures/Utils';

export default async function (client: Client) {
  const slashCommandFiles = new Array();
  Utils.getPath(__dirname + '/../slashCommands', slashCommandFiles);

  //Wait for bot to login
  client.on('ready', async () => {
    const commands = new Array();
    for (const path of slashCommandFiles) {
      const file = (await import(path)).default;
      const command = Object.assign({}, file);
      delete command.category;
      delete command.usage;
      delete command.aliases;

      client.application?.commands.create(command);
      client.slashCommand.set(file.name, file);
    }    
  })
}