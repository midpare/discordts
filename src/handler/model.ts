import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Model } from '../managers/Model.js';
import { MidpareClient } from '../structures/Client.js';
import { Utils } from '../structures/Utils.js';

export default async function (client: MidpareClient) {
  const modelFiles = new Array();
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  Utils.getPath(modelFiles, __dirname + '/../models');

  for (const path of modelFiles) {
    const file = (await import(path)).default

    if (!(file instanceof Model))
      continue;

    Object.defineProperty(client.models, file.name, { value: file.model });
  }
  console.log('Successfully handled the models!');
}