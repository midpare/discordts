import { Interaction } from '../../managers/Interaction';
import { ActionRowBuilder, bold, ButtonBuilder, ButtonStyle, Message } from 'discord.js';
import { Utils } from '../../structures/Utils';

export default new Interaction({
  name: 'tic-tac-toe',
  deleted: false,
  execute: async ({ interaction, options, client }) => {
    if (!options)
      return;

    const tictactoe = client.tictactoe.get(options.etc.players);
    const row = <ActionRowBuilder<ButtonBuilder>>new ActionRowBuilder();
    const button = new ButtonBuilder()
      .setCustomId(Utils.uuid());
    const position = options.etc.position

    if (!tictactoe)
      return

    if (tictactoe.turn.id != interaction.user.id) {
      interaction.reply({ content: '자신의 턴을 기다려주세요', ephemeral: true }) 
      return;
    }

    const winner = tictactoe.set(position);
    if (winner) {
      const user = bold(winner.user.username);
      options.etc.turn.edit(`${user}님이 승리했습니다!`);
      
      for (const id of options.etc.customIds) {
        client.interactionOptions.delete(id)
      }
    }

    interaction.deferUpdate();

    const user = bold(options.etc.players[0].user.username);
    const target = bold(options.etc.players[1].user.username);
    if (tictactoe.flag == 1) {
      if (!winner) 
        options.etc.turn.edit(`${user}님의 턴입니다!`);
      
      button
        .setStyle(ButtonStyle.Danger)
        .setLabel('X');
    }
    else {
      if (!winner)
        options.etc.turn.edit(`${target}님의 턴입니다!`);

      button
        .setStyle(ButtonStyle.Primary)
        .setLabel('O');
    }

    const buttonMsg = options.etc.buttons[position[0]];
    for (let i = 0; i < 3; i++) {
      if (i == position[1]) {
        row.addComponents(button);
      } else {
        row.addComponents(buttonMsg.components[0].components[i])
      }
    }

    buttonMsg.edit({ components: [row] })
  }
})