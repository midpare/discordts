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

    const image = msg.attachments.filter((e) => e.contentType?.startsWith('image') ?? false)
    if (!logChannel || image.first())
      return;

    logChannel.send(`-${msgChannel.name}-\n${msg.member?.displayName}: "${msg.content}"`) 
  },
})