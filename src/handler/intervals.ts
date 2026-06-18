import ms from 'ms';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Interval } from '../managers/Interval.js';
import { MidpareClient } from '../structures/Client.js';
import { Utils } from '../structures/Utils.js';

export default async function (client: MidpareClient) {
  const intervalFiles = new Array();
  
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  Utils.getPath(intervalFiles, __dirname + '/../interval');

  for (const path of intervalFiles) {
    const file = (await import(path)).default;

    if (!(file instanceof Interval))
      continue;

    if (file.immediate)
      file.execute(client);
    setInterval(file.execute, ms(file.interval), client);
  }
  console.log('Successfully handled the intervals!');
}
