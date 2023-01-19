import { ActionRowBuilder, ModalSubmitInteraction, StringSelectMenuBuilder } from 'discord.js';
import { Utils } from '../../structures/Utils';
import { Interaction } from '../../managers/Interaction';

export default new Interaction<ModalSubmitInteraction, null>({
  name: 'select music',
  execute: async ({ interaction, client }) => {
    const { value: title } = interaction.fields.fields.get('title')!;
    const { items } = await Utils.request({
      uri: 'https://www.googleapis.com/youtube/v3/search',
      method: 'GET',
      json: true,
      qs: {
        q: title,
        part: 'snippet',
        maxResults: 5,
        type: 'video',
        key: process.env.YOUTUBE_API_KEY,
      }
    });

    const selectMenuOptions = items.map((e: { snippet: { title: string }, id: { videoId: string } }) => {
      return {
        label: e.snippet.title,
        description: '위 노래를 재생합니다.',
        value: e.id.videoId + ` ${title}`, 
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