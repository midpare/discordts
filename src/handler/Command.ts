import { REST, Routes } from 'discord.js';
import { Client } from '../structures/Client';
import { Utils } from '../structures/Utils';

export default async function (client: Client) {
  const CommandsFiles = new Array();
  Utils.getPath(CommandsFiles, __dirname + '/../Commands');

  //Wait for bot to login
  client.on('ready', async () => {
    let commands = new Array();
    for (const path of CommandsFiles) {
      const file = (await import(path)).default;
      if (!file)
        continue;

      client.commands.set(file.name, file);

      const command = Object.assign({}, file);

      delete command.aliases;
      delete command.category;
      delete command.usage;
      delete command.execute;

      if (command.default_member_permissions)
        command.default_member_permissions = command.default_member_permissions.toString();

      commands.push(command);
    }

    const rest = new REST().setToken(process.env.DISCORD_TOKEN ?? '');
    rest.put(Routes.applicationCommands(client.user?.id ?? ''), { body: commands })
      .then(() => console.log('Success to put commands!'))
      .catch(console.error);
  });
}