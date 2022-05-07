import { glob } from 'glob';
import { promisify } from 'util';
import ms from 'ms';
import { Interval } from '../managers/Interval';
import { ExtendClient } from '../structures/Client';

const globPromise = promisify(glob);

export = async function (client: ExtendClient) {
  const intervalFiles = await globPromise(`${__dirname}/../interval/**/*{.ts,.js}`);

  for (const dir of intervalFiles) {
    const file: Interval = (await import(dir)).default;
    try {
      if (file.immediate)
        file.execute(client);
      setInterval(file.execute, ms(file.interval), client);
    } catch (error) {
      console.error(error);
    }
  }
}
