import { glob } from 'glob';
import { promisify } from 'util';
import { ExtendClient } from '../structures/Client';

const globPromise = promisify(glob);

export = async function (client: ExtendClient) {
  const interactionFiles = await globPromise(`${__dirname}/../interactions/**/*{.ts,.js}`);
  for (const dir of interactionFiles) {
    const file = (await import(dir)).default;
    try {
      client.interactions.set(file.name, file);
    } catch (error) {
      console.error(error);
    }
  }
}