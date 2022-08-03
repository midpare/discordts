import { Client } from '../structures/Client';
import { Utils } from '../structures/Utils';

export default async function (client: Client) {
  const interactionFiles = new Array();
  Utils.getPath(interactionFiles, __dirname + '/../interactions');

  for (const path of interactionFiles) {
    const file = (await import(path)).default;
    try {
      client.interactions.set(file.name, file);
    } catch (error) {
      console.error(error);
    }
  }
}