import { SelectMenuInteraction } from 'discord.js';
import { Interaction } from '../../managers/Interaction';

export default new Interaction<SelectMenuInteraction>({
  name: 'upload',
  execute: async ({ interaction, options, client }) => {
    const { guildId, user: { id, username: name } } = interaction;
    const school = client.models.school;
    const { cityCode, cityName, schoolCode, schoolName, grade } = options.data;
    const _class = interaction.values[0];

    const user = await school.findOne({ id, guildId });
    const msg = options.messages[0]
    
    if (!user) {
      const newSchoolInfo = new school({ id, guildId, name, cityCode, cityName, schoolCode, schoolName, grade, class: _class });
      newSchoolInfo.save();
      msg?.edit({ content: '성공적으로 유저 정보를 등록했습니다!', components: [] });
    } else {
      (await client.models.school.updateOne({ id, guildId }, { $set: { cityCode, cityName, schoolCode, schoolName, grade, class: _class } })).matchedCount;
      msg?.edit({ content: '성공적으로 유저 정보를 업데이트했습니다!', components: [] });
    }

    interaction.deferUpdate()
  },
});