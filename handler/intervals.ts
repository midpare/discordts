import { glob } from 'glob';
import { promisify } from 'util';
import ms from 'ms';
import { IntervalType } from '../typings/interval';

const globPromise = promisify(glob);

export = async function () {
  const intervalFiles = await globPromise(`${__dirname}/../interval/**/*{.ts,.js}`);

  intervalFiles.forEach((value: string) => {
    const file: IntervalType = require(value);
    try {
      if (file.immediate)
        file.execute();
      setInterval(file.execute, ms(file.interval));
    } catch (error) {
      console.error(error);
    }
  });
}
