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
      commands.push(command);
      client.slashCommand.set(file.name, file);
    }
    const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN || '');
    
    rest.put(Routes.applicationCommands('898169849086365716'), { body: commands });
  })
}