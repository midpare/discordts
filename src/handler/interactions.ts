import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Interaction } from '../managers/Interaction.js';
import { MidpareClient } from '../structures/Client.js';
import { Utils } from '../structures/Utils.js';


export default async function (client: MidpareClient) {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const interactionFiles = new Array();
  Utils.getPath(interactionFiles, __dirname + '/../interactions');

  for (const path of interactionFiles) {
    const file = (await import(path)).default;

    if (!(file instanceof Interaction))
      continue;
    if (client.interactions.get(file.name)) 
      throw `name duplicated! command name: ${file.name}, path: ${path}`

    client.interactions.set(file.name, file);
  }
  console.log('Successfully handled the interactions!');
}