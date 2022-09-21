import { Event } from '../managers/Event';
import { Client } from '../structures/Client';

export default new Event({
  name: 'ready',
  execute: async (client: Client) => {
    const guilds = Array.from(client.guilds.cache.values());
    for (const guild of guilds) {
      const guildId = guild.id;
      const guildInfo = await client.models.guild.findOne({ id: guildId });
      if (!guildInfo) {
        const newGuild = new client.models.guild({ id: guildId });
        newGuild.save();
      }
      
      const members = Array.from(guild.members.cache.values());
      for (const member of members) {
        const { id, user: { username: name } } = member;
        const user = await client.models.config.findOne({ id, guildId });
        
        if (member.user.bot)
          continue;

        if (!user) {
          const newUser = new client.models.config({ id, name, guildId });
          newUser.save();
        } else if (user.name != member.displayName) {
        
        }

      }
    }
    console.log(`Successfully logged in to ${client.guilds.cache.size} servers!`);
  },
});