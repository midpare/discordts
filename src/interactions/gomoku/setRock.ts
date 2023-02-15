import { bold, ModalSubmitInteraction } from 'discord.js';
import { Interaction } from '../../managers/Interaction';

export default new Interaction<ModalSubmitInteraction, null>({
  name: 'gomoku setRock',
  execute: async ({ interaction, options, client }) => {
    const [x, y] = interaction.fields.fields.map((e) => parseInt(e.value) - 1);

    const id = interaction.user.id;
    const gomoku = client.gomoku.get(id)!;

    if ((x < 0 || x > 14) && (y < 0 || y > 14)) {
      interaction.reply({ content: '1에서 15사이의 정수를 입력해주시기 바랍니다.', ephemeral: true });
      gomoku.setInteractionOptions(options.message);
      return;
    } 
    
    if (gomoku.matrix[x][y] != 0) {
      interaction.reply({ content: '이 자리에는 돌을 놓을 수 없습니다.', ephemeral: true });
      gomoku.setInteractionOptions(options.message);
      return;
    }

    interaction.deferUpdate();
    
    gomoku?.setRock(x, y);

    const winner = gomoku.checkWin();

    const { embed, file } = gomoku;
     
    if (winner != 0) {
      const users = gomoku.players.map(e => bold(e.displayName))
      embed.setDescription(`${winner == 1 ? users[0] : users[1]}님이 승리했습니다!`);
      
      options.message.edit({ embeds: [embed], files: [file] })
      return;
    }
    const message = await options.message.edit({ embeds: [embed], files: [file] });

    gomoku.setInteractionOptions(message);
  },
})