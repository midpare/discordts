import { glob } from 'glob';
import { promisify } from 'util';
import { Client } from '../structures/Client';

const globPromise = promisify(glob);

export default async function (client: Client) {
  const eventFiles = await globPromise(`${__dirname}/../events/**/*{.ts,.js}`);
  
  for (const dir of eventFiles) {
    const file = (await import(dir)).default;
    try {
      client.on(file.name, file.execute);
    } catch(error) {
      console.error(error);
    }
  }
}  