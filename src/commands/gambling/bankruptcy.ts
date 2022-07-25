import { Command } from '../../managers/Commands';
import { MessageActionRow, MessageButton } from 'discord.js';
import { Utils } from '../../structures/Utils';
import { InteractionOptions } from '../../structures/InteractionOptions';

export default new Command({
  name: '파산',
  category: '도박',
  usage: '파산',
  description: '모든 돈과 빚을 0원으로 만들고 한시간동안 도박을 하지 못합니다.',
  execute: async ({ msg, args, client }) => {
    const id = msg.author.id;
    const customIds = Utils.uuid(2)
    const [bankrupctyId, cancelId] = customIds

    const row = new MessageActionRow().addComponents(
      new MessageButton()
        .setLabel(client.messages.yes)
        .setStyle('SUCCESS')
        .setCustomId(bankrupctyId),
      new MessageButton()
        .setLabel(client.messages.no)
        .setStyle('DANGER')
        .setCustomId(cancelId),
    );


    const message = await msg.reply({ content: '정말 파산하시겠습니까? 파산하시면 돈과 빚이 모두 0원으로 돌아가며 한시간동안 도박을 할 수 없습니다.', components: [row] })

    client.interactionOptions.set(bankrupctyId, new InteractionOptions({
      id,
      cmd: 'bankrupcty',
      message,
      customIds,
    }));
    client.interactionOptions.set(cancelId, new InteractionOptions({
      id,
      cmd: 'cancel',
      message,
      customIds,
    }));
  },
});