import { Command } from '../../managers/Commands';
import { gambling } from '../../models/gambling';
import { MessageActionRow, MessageButton } from 'discord.js';
import { messages } from '../../util/language/message';

const interactionUser = new Array();
export default new Command({
  name: '파산',
  category: '도박',
  usage: '파산',
  description: '모든 돈과 빚을 0원으로 만들고 3일간 도박을 하지 못합니다.',
  execute: async ({ msg, args, client }) => {
    const id = msg.author.id;
    const user = await gambling.findOne({ id });
    if (interactionUser.includes(id))
      return msg.delete();

    const date = new Date();
    const today = '' + date.getFullYear() + date.getMonth() + date.getDate();

    const row = new MessageActionRow().addComponents(
      new MessageButton()
        .setLabel(messages.yes)
        .setStyle('SUCCESS')
        .setCustomId('yes'),
      new MessageButton()
        .setLabel(messages.no)
        .setStyle('DANGER')
        .setCustomId('no'),
    );
    const message = await msg.reply({ content: '정말 파산하시겠습니까? 돈과 빚이 모두 0원으로 돌아갑니다', components: [row] })
    interactionUser.push(id);

    const collector = msg.channel.createMessageComponentCollector({
      max: 1,
    });

    collector.on('collect', async (interaction) => {

      if (!interaction || interaction.user.id != msg.author.id)
        return

      if (interaction.customId == 'yes') {
        (await gambling.updateOne({ id }, { $set: { bankruptcy: parseFloat(today), money: 0, debt: 0, principalDebt: 0, stock: [] } })).matchedCount;
        msg.reply(`${user.name}님이 파산했습니다!`);
        message.delete();
      } else if (interaction.customId == 'no') {
        msg.delete();
        message.delete();
      }

      interactionUser.splice(interactionUser.findIndex((element: string) => element == id), 1)
    });
  },
});