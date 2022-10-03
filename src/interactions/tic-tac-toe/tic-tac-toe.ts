import { Interaction } from '../../managers/Interaction';
import { ActionRowBuilder, bold, ButtonBuilder, ButtonStyle } from 'discord.js';
import { Utils } from '../../structures/Utils';

export default new Interaction({
  name: 'tic-tac-toe',
  deleted: false,
  execute: async ({ interaction, options, client }) => {
    if (!options)
      return;

    const tictactoe = client.tictactoe.get(options.ids);
    const row = <ActionRowBuilder<ButtonBuilder>>new ActionRowBuilder();
    const button = new ButtonBuilder()
      .setCustomId(Utils.uuid());

    const position = options.data.position;
    const user = bold(options.data.players[0].username);
    const target = bold(options.data.players[1].username);

    if (!tictactoe)
      return

    if (tictactoe.flag == 1) {
      button
        .setStyle(ButtonStyle.Danger)
        .setLabel('X');
    }
    else {
      button
        .setStyle(ButtonStyle.Primary)
        .setLabel('O');
    }

    if (tictactoe.turn.id != interaction.user.id) {
      interaction.reply({ content: '자신의 턴을 기다려주세요', ephemeral: true })
      return;
    }

    const winner = tictactoe.set(position);
    let flag = 0

    for (const line of tictactoe.table) {
      for (const e of line) {
        if (e == 0) {
          flag = 1;
          break;
        }
      }
    }

    interaction.deferUpdate();

    if (flag == 0)
      options.data.turn.edit(`무승부입니다!`);
    else if (winner) {
      const user = bold(winner.username);
      options.data.turn.edit(`${user}님이 승리했습니다!`);

      for (const id of options.data.customIds) {
        client.interactionOptions.delete(id)
      }
    } else {
      if (tictactoe.flag == 1)
        options.data.turn.edit(`${user}님의 턴입니다!`);
      else
        options.data.turn.edit(`${target}님의 턴입니다!`);


    }

    const buttonMsg = options.data.buttons[position[0]];
    for (let i = 0; i < 3; i++) {
      if (i == position[1]) {
        row.addComponents(button);
      } else {
        row.addComponents(buttonMsg.components[0].components[i])
      }
    }

    buttonMsg.edit({ components: [row] });
  },
});