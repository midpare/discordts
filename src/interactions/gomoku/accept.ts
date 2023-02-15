import { loadImage } from 'canvas';
import { ButtonInteraction, GuildMember } from 'discord.js';
import { Interaction } from '../../managers/Interaction';
import { Gomoku } from '../../structures/interactions/gomoku';

export default new Interaction<ButtonInteraction, Array<GuildMember>>({
  name: 'accept gomoku',
  execute: async ({ interaction, options, client }) => {
    interaction.deferUpdate();

    const { data: players } = options;
    const baseImage = await loadImage(`${process.cwd()}/assests/gomoku.png`);
    const gomoku = new Gomoku(client, baseImage, players);

    for (const { id } of players) {
      client.gomoku.set(id, gomoku);
    }
    
    const { file, embed, components } = gomoku;

    options.message.delete();
    const message = await interaction.channel?.send({ embeds: [embed], components, files: [file] });
    gomoku.setInteractionOptions(message!);
  },
});