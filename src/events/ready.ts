import { Event } from '../managers/Event';
import { Client } from '../structures/Client';

export default new Event({
  name: 'ready',
  execute: async (client: Client) => {
    console.log(`Successfully logged in to ${client.guilds.cache.size} servers!`);
  },
});