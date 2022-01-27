import { glob } from 'glob';
import { promisify } from 'util';
import ms from 'ms';
import { IntervalType } from '../util/typings/interval';

const globPromise = promisify(glob);

export = async function () {
  const intervalFiles = await globPromise(`${__dirname}/../interval/**/*{.ts,.js}`);

  for (const dir of intervalFiles) {
    const file: IntervalType = (await import(dir)).default;
    try {
      if (file.immediate)
        file.execute();
      setInterval(file.execute, ms(file.interval));
    } catch (error) {
      console.error(error);
    }
  }
}
