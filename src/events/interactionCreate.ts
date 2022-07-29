import { Client } from '../structures/Client';
import { BaseInteraction, CommandInteractionOptionResolver, CacheType } from 'discord.js';
import { Event } from '../managers/Event';

export default new Event({
  name: 'interactionCreate',
  execute: async (interaction: BaseInteraction) => {
    const client = <Client>interaction.client;
    if (interaction.isChatInputCommand()) {
      const { commandName, options } = interaction;

      const event = client.slashCommand.get(commandName)!;
      console.log(options);
      console.log(event);
      event.execute({ interaction, options: options as CommandInteractionOptionResolver<CacheType>,  client })
      
    } else if (interaction.isButton() || interaction.isSelectMenu()) {
      const id = interaction.user.id;
      const options = client.interactionOptions.get(interaction.customId);
      let event = client.interactions.get(interaction.customId);

      if (!options && event) {
        event.execute({ interaction, options, client });
        return;
      }

      if (!options) {
        interaction.reply({ content: '사용되지 않거나 종료된 상호작용입니다.', ephemeral: true });
        return;
      }

      event = client.interactions.get(options.cmd);
      if (!event || !options.ids.includes(id)) {
        interaction.reply({ content: '이 상호작용을 사용할 수 없습니다.', ephemeral: true });
        return;
      }

      try {
        event.execute({ interaction, options, client });
        for (const id of options.customIds) {
          client.interactionOptions.delete(id);
        }

        if (event.deleted) {
          for (const msg of options.messages) {
            msg.delete();
          }
        }
      } catch (error) {
        console.error(error);
      }
    }
  },
});