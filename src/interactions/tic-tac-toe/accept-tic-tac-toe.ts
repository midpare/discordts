import { ActionRowBuilder, bold, ButtonBuilder, ButtonStyle } from 'discord.js';
import { Interaction } from '../../managers/Interaction';
import { TicTacToe } from '../../structures/games/tic-tac-toe';
import { InteractionOptions } from '../../structures/InteractionOptions';
import { Utils } from '../../structures/Utils';

export default new Interaction({
  name: 'accept-tic-tac-toe',
  deleted: true,
  execute: async ({ interaction, options, client }) => {
    const messages = new Array();
    if (!options || !options.etc)
      return;
    
    const user = bold(options.etc.players[0].username);
    const target = bold(options.etc.players[1].username);
    messages.push(await interaction.channel?.send(`${user} VS ${target}`));

    const turn = await interaction.channel?.send(`${user}님의 턴입니다!`);
    messages.push(turn);
    const customIds = Utils.uuid(9);

    let index = 0;
    const buttons = new Array();
    for (let i = 0; i < 3; i++) {
      const row = <ActionRowBuilder<ButtonBuilder>>new ActionRowBuilder();
      for (let j = 0; j < 3; j++) {
        const button = new ButtonBuilder()
          .setCustomId(customIds[index])
          .setStyle(ButtonStyle.Secondary)
          .setLabel('　')
        row.addComponents(button);
        index++
      }
      const msg = await interaction.channel?.send({ components: [row] })
      buttons.push(msg);
      messages.push(msg);
    }

    index = 0;
    const ids = [options.etc.players[0].id, options.etc.players[1].id]
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        client.interactionOptions.set(customIds[index], new InteractionOptions({
          ids,
          cmd: 'tic-tac-toe',
          messages,
          customIds: [],
          etc: {
            players: options.etc.players,
            position: [i, j],
            buttons,
            turn,
            customIds,
          },
        }));
        index++;
      }
    }
    client.tictactoe.set(ids, new TicTacToe(options.etc.players))
  }
})