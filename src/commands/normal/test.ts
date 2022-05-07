import { MessageActionRow, MessageButton } from "discord.js";
import { Command } from "../../managers/Commands";

export default new Command({
  name: 'test',
  category: '기본',
  usage: '테스트',
  description: '테스트',
  execute: ({ msg, args, client }) => {
    const row = new MessageActionRow().addComponents(
      new MessageButton()
        .setCustomId('test customId')
        .setLabel('test label')
        .setStyle('PRIMARY')
    )
    msg.channel.send({ components: [row] });
  },
});