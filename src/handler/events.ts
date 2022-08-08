import { Client } from '../structures/Client';
import { Utils } from '../structures/Utils';

export default async function (client: Client) {
  const eventFiles = new Array();
  Utils.getPath(eventFiles, __dirname + '/../events');

  for (const path of eventFiles) {
    const file = (await import(path)).default;
    try {
      client.on(file.name, file.execute);
    } catch (error) {
      console.error(error);
    }
  }
  console.log('Success to handle events!')
}  