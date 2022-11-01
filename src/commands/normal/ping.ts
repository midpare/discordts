import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';
import { Command } from '../../managers/Command';

export default new Command({
  name: 'ping',
  category: '기본',
  usage: 'ping',
  description: '봇의 현재상태를 확인합니다',
  execute: async ({ interaction, client }) => {
    // const customId = Utils.uuid();

    // const modal = new ModalBuilder()
    //   .setCustomId(customId)
    //   .setTitle('테스트 제목')

    // const test = <ActionRowBuilder<TextInputBuilder>>new ActionRowBuilder().addComponents(
    //   new TextInputBuilder()
    //     .setCustomId('test`')
    //     .setLabel('테스트 레이블')
    //     .setStyle(TextInputStyle.Short)
    // )

    // client.interactionOptions.set(customId, new InteractionOption({
    //   ids: [interaction.user.id],
    //   guildId: interaction.guildId!,
    //   cmd: 'testModal',
    //   messages: [],
    //   customIds: [customId]
    // }))

    // modal.addComponents(test) 
    // interaction.showModal(modal);

    interaction.reply('pong!')
    return 1;
  },
});