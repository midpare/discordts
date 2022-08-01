import { ActionRowBuilder, bold, ButtonBuilder, ButtonStyle, EmbedBuilder } from 'discord.js';
import { Command } from '../../managers/Commands';
import { InteractionOptions } from '../../structures/InteractionOptions';
import { Utils } from '../../structures/Utils';

export default new Command({
  name: '틱택토',
  aliases: ['tictactoe'],
  category: '게임',
  usage: '틱택토 <유저>',
  description: '[유저]와 틱택토 게임을 합니다.',
  execute: async ({ msg, args, client }) => {
    const target = msg.mentions.members?.first();
    const id = msg.author.id
    if (!target) {
      msg.reply(client.messages.missingMentionUser('틱택토를 '));
      return;
    }
    
    if (!msg.member || target.id == id) {
      msg.reply('자신을 맨션할 수 없습니다.');
      return;
    }

    const customIds = Utils.uuid(2);
    const [yes, no] = customIds;
    const row = <ActionRowBuilder<ButtonBuilder>>new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId(yes)
        .setStyle(ButtonStyle.Success)
        .setLabel('수락'),
      new ButtonBuilder()
        .setCustomId(no)
        .setStyle(ButtonStyle.Danger)
        .setLabel('거절'),
    )
    
    
    const embed = new EmbedBuilder()
      .setTitle('⚔ 틱택토')
      .setDescription(`${bold(msg.member.user.username)}가 ${bold(target.user.username)}에게 틱택토 매치를 신청했습니다!`)

    const message = await msg.channel.send({ embeds: [embed], components: [row] })

    client.interactionOptions.set(yes, new InteractionOptions({
      ids: [target.id],
      cmd: 'accept-tic-tac-toe',
      messages: [message],
      customIds,
      etc: {
        players: [msg.member, target],
      },
    }));

    client.interactionOptions.set(no, new InteractionOptions({
      ids: [id, target.id],
      cmd: 'cancel',
      messages: [message],
      customIds,
    }));
  }
})