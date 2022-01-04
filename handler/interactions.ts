import { glob } from 'glob';
import { promisify } from 'util';
import { ExtendClient } from '../contexts/client';
import { InteractionType } from '../typings/interaction';

const globPromise = promisify(glob);

export = async function (client: ExtendClient) {
  const interactionFiles = await globPromise(`${__dirname}/../interactions/**/*{.ts,.js}`);
  interactionFiles.forEach(async (value: string) => {
    const file: InteractionType = (await import(value));
    try {
      client.interactions.set(file.name, file);
    } catch (error) {
      console.error(error);
    }
  });
}