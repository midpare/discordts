import { glob } from 'glob';
import { promisify } from 'util';
import { ExtendClient } from '../structures/Client';

const globPromise = promisify(glob);

export = async function (client: ExtendClient) {
  const eventFiles = await globPromise(`${__dirname}/../events/**/*{.ts,.js}`);
  for (const dir of eventFiles) {
    const file = (await import(dir));
    try {
      client.on(file.name, file.event);
    } catch(error) {
      console.error(error);
    }
  }
}  