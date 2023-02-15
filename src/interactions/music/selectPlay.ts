import { ActionRowBuilder, Message, ModalSubmitInteraction, StringSelectMenuBuilder } from 'discord.js';
import { Utils } from '../../structures/Utils';
import { Interaction } from '../../managers/Interaction';
import { InteractionOption } from '../../structures/interactions/InteractionOptions';
import { search } from 'play-dl'

export default new Interaction<ModalSubmitInteraction, null>({
  name: 'select play',
  execute: async ({ interaction, client }) => {
    const { value: searchTitle } = interaction.fields.fields.get('title')!;
    const result = await search(searchTitle, { limit: 5 });

    const customIds = Utils.uuid(5);
    const selectMenuOptions = result.map((e, i) => {
      const { url, title, durationRaw: duration } = e;
      client.interactionOptions.set(customIds[i], new InteractionOption({
        ids: [interaction.user.id],
        guildId: interaction.guildId!,
        cmd: '',
        customIds,
        message: {} as Message,
        data: {
          url,
          title,
          search: searchTitle,
          duration,
        }
      }));

      return {
        label: `(${duration}) ${title?.slice(0, 100 - duration.length - 3)}`,
        description: '위 노래를 재생합니다.',
        value: customIds[i], 
      }
    });

    const row = new ActionRowBuilder<StringSelectMenuBuilder>().setComponents(
      new StringSelectMenuBuilder()
        .setCustomId('play music')
        .setOptions(selectMenuOptions)
        .setPlaceholder('이곳을 눌러 선택해주세요.')
    );
    
    interaction.reply({ content: '검색결과 5개중 원하는 노래를 선택해주세요.', ephemeral: true, components: [row] });
  },
});