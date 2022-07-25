import { glob } from 'glob';
import { promisify } from 'util';
import { Client } from '../structures/Client';

const globPromise = promisify(glob);

export = async function (client: Client) {
  const mainCommandFiles = await globPromise(`${__dirname}/../commands/**/*{.ts,.js}`);
  for (const dir of mainCommandFiles) {
    const file = (await import(dir)).default;
    if (client.commands.get(file.name))
      throw `command name duplicate! command path: ${dir}, command name: ${file.name}`;

    client.commands.set(file.name, file);

    if (file.aliases) {
      for (const fileName of file.aliases) {
        if (client.commands.get(fileName))
          throw `command name duplicate! command path: ${dir}, command name: ${fileName}`;

        client.commands.set(fileName, file);
      }
    }
  }
}