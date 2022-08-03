import { SubCommand } from '../managers/SubCommands';
import { Client } from '../structures/Client';
import { Utils } from '../structures/Utils';

export default async function (client: Client) {
  const slashCommandFiles = new Array();
  Utils.getPath(slashCommandFiles, __dirname + '/../slashCommands');

  //Wait for bot to login
  client.on('ready', async () => {
    for (const path of slashCommandFiles) {
      const file = (await import(path)).default;
      if (file instanceof SubCommand)   
        continue;

      client.slashCommands.set(file.name, file);
      const command = Object.assign({}, file);

      delete command.aliases;
      delete command.category;
      delete command.usage;
      delete command.execute;
      
      if (command.subCommands) {
        const directories = new Array();
        Utils.getPath(directories, path + '/..' + command.subCommands);
        command.options = new Array()
        for (const dir of directories) {
          const subFile = (await import(dir)).default;
          client.subCommands.set(file.name + ' ' + subFile.name, subFile);
          const subCommand = Object.assign({}, subFile);
        
          
          delete subCommand.aliases;
          delete subCommand.category;
          delete subCommand.usage;
          delete subCommand.execute;
          
          command.options.push(subCommand);
        }
        delete command.subCommands;
      }


      for (const [_, guild] of client.guilds.cache) {
        guild.commands.create(command);
      }
    }    
  });
}