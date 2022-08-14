import { REST, Routes } from 'discord.js';
import { Command } from '../managers/Command';
import { Client } from '../structures/Client';
import { Utils } from '../structures/Utils';

export default async function (client: Client) {
  const CommandsFiles = new Array();
  Utils.getPath(CommandsFiles, __dirname + '/../commands');

  //Wait for bot to login
  client.on('ready', async () => {
    let commands = new Array();
    for (const path of CommandsFiles) {
      const file = (await import(path)).default;
      
      if (!(file instanceof Command))
        continue;

      const { aliases, category, usage, execute, ...command } = file
      client.commands.set(file.name, file);

      commands.push(command);
    }

    const rest = new REST().setToken(process.env.DISCORD_TOKEN ?? '');
    rest.put(Routes.applicationCommands(client.user?.id ?? ''), { body: commands })
      .then(commands => {
        if (commands instanceof Array)
          console.log(`Success to put commands! number of commands: ${commands.length}`);
      })
      .catch(console.error);
  });
}