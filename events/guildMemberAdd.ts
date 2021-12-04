import { GuildMember } from "discord.js";

export = {
  name: 'guildMemberAdd',
  event : (user: GuildMember) => {
    user.roles.add('910521119713394739')
  }
}