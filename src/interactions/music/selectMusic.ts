import { ActionRowBuilder, Message, ModalSubmitInteraction, StringSelectMenuBuilder } from 'discord.js';
import { Utils } from '../../structures/Utils';
import { Interaction } from '../../managers/Interaction';
import { InteractionOption } from '../../structures/interactions/InteractionOptions';

export default new Interaction<ModalSubmitInteraction, null>({
  name: 'select music',
  execute: async ({ interaction, client }) => {
    const { value: search } = interaction.fields.fields.get('title')!;
    const { items } = await Utils.request({
      uri: 'https://www.googleapis.com/youtube/v3/search',
      method: 'GET',
      json: true,
      qs: {
        q: search,
        part: 'snippet',
        maxResults: 5,
        type: 'video',
        key: process.env.YOUTUBE_API_KEY,
      }
    });

    const customIds = Utils.uuid(5);
    const selectMenuOptions = items.map((e: { snippet: { title: string }, id: { videoId: string } }, i: number) => {
      client.interactionOptions.set(customIds[i], new InteractionOption({
        ids: [interaction.user.id],
        guildId: interaction.guildId!,
        cmd: '',
        customIds,
        messages: [{} as Message],
        data: {
          videoId: e.id.videoId,
          search,
          title: e.snippet.title,
        }
      }));

      return {
        label: e.snippet.title.slice(0, 100),
        description: '위 노래를 재생합니다.',
        value: customIds[i], 
      }
    });

    const row = <ActionRowBuilder<StringSelectMenuBuilder>>new ActionRowBuilder().setComponents(
      new StringSelectMenuBuilder()
        .setCustomId('play music')
        .setOptions(selectMenuOptions)
        .setPlaceholder('이곳을 눌러 선택해주세요.')
    );
    
    interaction.reply({ content: '검색결과 5개중 원하는 노래를 선택해주세요.', ephemeral: true, components: [row] });
  },
});