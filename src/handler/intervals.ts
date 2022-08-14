import ms from 'ms';
import { Interval } from '../managers/Interval';
import { Client } from '../structures/Client';
import { Utils } from '../structures/Utils';

export default async function (client: Client) {
  const intervalFiles = new Array();
  Utils.getPath(intervalFiles, __dirname + '/../interval');

  for (const path of intervalFiles) {
    const file = (await import(path)).default;

    if (!(file instanceof Interval))
      continue;
      
    try {
      if (file.immediate)
        file.execute(client);
      setInterval(file.execute, ms(file.interval), client);
    } catch (error) {
      console.error(error);
    }
  } 
  console.log('Success to handle intervals!');
}
