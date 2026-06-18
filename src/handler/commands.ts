import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Events, REST, Routes } from 'discord.js';
import { Command } from '../managers/Command.js';
import { MidpareClient } from '../structures/Client.js';
import { Utils } from '../structures/Utils.js';


export default async function (client: MidpareClient) {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const CommandsFiles = new Array();
  Utils.getPath(CommandsFiles, __dirname + '/../commands');

  //Wait for bot to login
  client.on(Events.ClientReady, async () => {
    let commands = new Array();
    for (const path of CommandsFiles) {
      const file = (await import(path)).default;

      if (!(file instanceof Command))
        continue;

      const { aliases, category, usage, execute, ...command } = file
      client.commands.set(file.name, file);

      commands.push(command);
    }

    const rest = new REST().setToken(client.token ?? '');
    rest.put(Routes.applicationCommands(client.user?.id ?? ''), { body: commands })
      .then(commands => {
        if (commands instanceof Array) {
          console.log(`Successfully set up ${commands.length} commands!`);
        }   
      });
  });
}