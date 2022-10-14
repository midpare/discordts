import { TextChannel } from 'discord.js';
import { Event } from '../managers/Event';

export default new Event({
  name: 'messageCreate',
  execute: async (client, msg) => {
    if (!msg.guildId || msg.author.bot) 
      return;
    const { guildId } = msg

    const guild = await client.models.guild.findOne({ id: guildId });
    const logChannel = <TextChannel>msg.guild?.channels.cache.get(guild.log.message);
    const msgChannel = <TextChannel>msg.channel; 

    if (logChannel) {
      if (msg.content.includes('http')) {
        msg.content = msg.content.replace('http', '<http') + '>'
      }
      logChannel.send(`<t:${msg.createdTimestamp.toString().substring(0, 10)}>\n-${msgChannel.name}-\n${msg.member?.displayName}: "${msg.content}"`) 
    }
  },
});