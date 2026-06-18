import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Event } from '../managers/Event.js';
import { MidpareClient } from '../structures/Client.js';
import { Utils } from '../structures/Utils.js';


export default async function (client: MidpareClient) {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
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