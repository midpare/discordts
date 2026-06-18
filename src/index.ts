import mongoose from 'mongoose';
import { MidpareClient } from './structures/Client.js';
import { Utils } from './structures/Utils.js';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const client = new MidpareClient({ intents: 131071 });

(async () => {
  const handlerFiles = new Array();
  Utils.getPath(handlerFiles, __dirname + '/handler')

  for (const path of handlerFiles) {
    (await import(path)).default(client)
  }
})();

mongoose.set('strictQuery', false)
mongoose.connect(process.env.MONGO_DB_URI + 'discordbot');
client.login();
