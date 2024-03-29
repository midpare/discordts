import { EmbedBuilder, StringSelectMenuInteraction } from 'discord.js';
import { Interaction } from '../managers/Interaction';

export default new Interaction<StringSelectMenuInteraction, Map<string, { name: string, description: string }[]>>({
  name: 'help',
  execute: async ({ interaction, options, client }) => {
    const category = interaction.values[0];
    const commands = options.data.get(category)!;
    
    const fields = new Array();

    for (const command of commands) {
      fields.push({
        name: '/' + command.name,
        value: command.description,
        inline: false,
      });
    }
    
    const embed = new EmbedBuilder()
      .setTitle(`${category} 명령어`)
      .setDescription(`${category} 관련 명령어를 확인합니다.\n<>는 필수, []는 선택사항입니다.`)
      .setFields(fields);

    
    interaction.deferReply();
    options.message.edit({ embeds: [embed] })
    client.interactionOptions.set(interaction.customId, options);
  },
});