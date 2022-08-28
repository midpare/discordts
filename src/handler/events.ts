import { Event } from '../managers/Event';
import { Client } from '../structures/Client';
import { Utils } from '../structures/Utils';

export default async function (client: Client) {
  const eventFiles = new Array();
  Utils.getPath(eventFiles, __dirname + '/../events');

  for (const path of eventFiles) {
    const file = (await import(path)).default;

    if (!(file instanceof Event))
      continue;

    client.on(file.name, (...args) => {
      file.execute(client, ...args);
    });

  }
  console.log('Successfully handled events!');
}