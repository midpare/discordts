import { glob } from 'glob';
import { promisify } from 'util';
import { ExtendClient } from '../structures/Client';

const globPromise = promisify(glob);

export = async function (client: ExtendClient) {
  const eventFiles = await globPromise(`${__dirname}/../events/**/*{.ts,.js}`);
  eventFiles.forEach(async (value: string) => {
    const file = (await import(value));
    try {
      client.on(file.name, file.event);
    } catch(error) {
      console.error(error);
    }
  });
}