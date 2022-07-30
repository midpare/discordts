import { Client } from '../structures/Client';
import { Utils } from '../structures/Utils';

export default async function (client: Client) {
  const commandFiles = new Array();
  Utils.getPath(__dirname + '/../commands', commandFiles);
  for (const path of commandFiles) {
    const file = (await import(path)).default;
    if (client.commands.get(file.name))
      throw `command name duplicate! command path: ${path}, command name: ${file.name}`;

    client.commands.set(file.name.toLowerCase(), file);

    if (file.aliases) {
      for (const fileName of file.aliases) {
        if (client.commands.get(fileName))
          throw `command name duplicate! command path: ${path}, command name: ${fileName}`;

        client.commands.set(fileName, file);
      }
    }
  }
}