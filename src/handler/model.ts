import { Model } from '../managers/Model';
import { Client } from '../structures/Client';
import { Utils } from '../structures/Utils';

export default async function (client: Client) {
  const modelFiles = new Array();
  Utils.getPath(modelFiles, __dirname + '/../models');

  for (const path of modelFiles) {
    const file = (await import(path)).default

    if (!(file instanceof Model))
      continue;
    
    Object.defineProperty(client.models, file.name, { value: file.model });
  }
  console.log('Success to handle models!');
}
