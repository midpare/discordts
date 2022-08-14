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
        const { id, displayName: name } = member;
        const user = await client.models.config.findOne({ id, guildId });
  
        if (!user && !member.user.bot) {
          const newUser = new client.models.config({ id, name, guildId });
          newUser.save();
        }
      }
    }
    
    console.log(`Success to login!`);
  },
});