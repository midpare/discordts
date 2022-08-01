import { Interval } from '../managers/Interval';

export default new Interval({
  execute: async (client) => {
    const users = await client.models.config.find({ });
    const time = new Date().getTime()
    for (const user of users) {
      const guild = client.guilds.cache.get(user.guildId)!;
      if (guild) {
        const member = guild.members.cache.get(user.id)!;
        if (member) {
          if (time < user.banTime) {
            guild.members.unban(member);
          }   
        }
      }
    }
  },
  interval: '5m',
  immediate: false,
});
