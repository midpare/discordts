import { GuildMember } from 'discord.js';

export = {
  name: 'guildMemberAdd',
  event: async (user: GuildMember) => {
    try {
      user.roles.add('910521119713394739');
    } catch(error) {
      console.error(error);
    }
  },
}