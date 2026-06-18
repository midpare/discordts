import { Events } from 'discord.js';
import { Event } from '../managers/Event.js';
import { MidpareClient } from '../structures/Client.js';

const KEEP_GUILD_IDS = new Set([
  '910521119713394738',
  '1056562122529710110',
  '1372970709730594957',
  '1473375841047150738'
]);

export default new Event({
  name: Events.ClientReady,
  execute: async (client: MidpareClient) => {
    for (const guild of client.guilds.cache.values()) {
      const exist = await client.models.guild.findOne({ id: guild.id });

      if (exist)
        continue;

      await client.models.guild.create({
        id: guild.id,
        name: guild.name,
      });
      const members = await guild.members.fetch();
      for (const member of members.values()) {
        const { id, displayName: name, guild: { id: guildId } } = member;
        const guild = await client.models.guild.findOne({ id: guildId });

    
        const exist = await client.models.config.findOne({ id, name, guildId });
        if (exist)
          return;

        const newUser = new client.models.config({ id, name, guildId });
        newUser.save();
      }
    }
    console.log(`Successfully logged in to ${client.guilds.cache.size} servers!`);
  },
});