import { REST, Routes } from 'discord.js';
import { Client } from '../structures/Client';
import { Utils } from '../structures/Utils';

export default async function (client: Client) {
  const slashCommandFiles = new Array();
  Utils.getPath(slashCommandFiles, __dirname + '/../slashCommands');

  //Wait for bot to login
  client.on('ready', async () => {
    const commands = new Array();
    for (const path of slashCommandFiles) {
      const file = (await import(path)).default;

      client.slashCommands.set(file.name, file);
      
      const command = Object.assign({}, file);

      delete command.aliases;
      delete command.category;
      delete command.usage;
      delete command.execute; 
      // client.application?.commands.set([]);
      // client.application?.commands.create(command);
      if (command.default_member_permissions)
        command.default_member_permissions = command.default_member_permissions.toString();
      commands.push(command);
    }

    const rest = new REST().setToken(process.env.DISCORD_TOKEN ?? '');
    rest.put(Routes.applicationCommands(client.user?.id ?? ''), { body: commands });
  });
}