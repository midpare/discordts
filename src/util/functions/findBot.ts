import { GuildMember } from 'discord.js';

export function findBot(users: Array<GuildMember>): boolean {
  for(const user of users) {
    if (user.user.bot)
      return true;
  }
  return false
}