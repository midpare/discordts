import mongoose from 'mongoose';
import { Client } from './structures/Client';
import { Utils } from './structures/Utils';

const client = new Client({ intents: 131071 });

(async () => {
  const handlerFiles = new Array();
  Utils.getPath(handlerFiles, __dirname + '/handler')

  for (let path of handlerFiles) {
    (await import(path)).default(client).catch(console.error);
  }
})();

client.on('ready', async () => {
  // make configs

});

mongoose.connect(process.env.MONGO_DB_URI + '/discordbot');
client.login();