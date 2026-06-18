import { Events, Guild } from 'discord.js';
import { Event } from '../managers/Event.js';
import { MidpareClient } from '../structures/Client.js';

export default new Event({
  name: Events.GuildCreate,
  execute: async (client: MidpareClient, guild: Guild) => {
    const exist = await client.models.guild.findOne({ id: guild.id });

    if (!exist) 
      return;
    
    await client.models.guild.create({
      id: guild.id,
      name: guild.name,
    });
  },
});