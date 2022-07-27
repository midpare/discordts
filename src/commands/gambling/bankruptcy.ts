import { Command } from '../../managers/Commands';
import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';
import { Utils } from '../../structures/Utils';
import { InteractionOptions } from '../../structures/InteractionOptions';

export default new Command({
  name: '파산',
  category: '도박',
  usage: '파산',
  description: '모든 돈과 빚을 0원으로 만들고 한시간동안 도박을 하지 못합니다.',
  execute: async ({ msg, client }) => {
    const id = msg.author.id;
    const customIds = Utils.uuid(2)
    const [yes, no] = customIds

    const row = <ActionRowBuilder<ButtonBuilder>>new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setLabel(client.messages.yes)
        .setStyle(ButtonStyle.Success)
        .setCustomId(yes),
      new ButtonBuilder()
        .setLabel(client.messages.no)
        .setStyle(ButtonStyle.Danger)
        .setCustomId(no),
    )


    const message = await msg.reply({ content: '정말 파산하시겠습니까? 파산하시면 돈과 빚이 모두 0원으로 돌아가며 한시간동안 도박을 할 수 없습니다.', components: [row] })

    client.interactionOptions.set(yes, new InteractionOptions({
      ids: [id],
      cmd: 'bankrupcty',
      messages: [message],
      customIds,
    }));
    client.interactionOptions.set(no, new InteractionOptions({
      ids: [id],
      cmd: 'cancel',
      messages: [message],
      customIds,
    }));
  },
});