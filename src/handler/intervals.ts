import ms from 'ms';
import { Interval } from '../managers/Interval';
import { Client } from '../structures/Client';
import { Utils } from '../structures/Utils';

export default async function (client: Client) {
  const intervalFiles = new Array();
  Utils.getPath(__dirname + '/../interval', intervalFiles);

  for (const path of intervalFiles) {
    const file: Interval = (await import(path)).default;
    try {
      if (file.immediate)
        file.execute(client);
      setInterval(file.execute, ms(file.interval), client);
    } catch (error) {
      console.error(error);
    }
  }
}
