import { SelectMenuInteraction } from 'discord.js';
import { Interaction } from '../../managers/Interaction';

export default new Interaction<SelectMenuInteraction>({
  name: 'upload',
  deleted: true,
  execute: async ({ interaction, options, client }) => {
    if (!options || !options.data)
      return;

    const { guildId, user: { id, username: name } } = interaction;
    const school = client.models.school;
    const { cityCode, cityName, schoolCode, schoolName, grade } = options.data;
    const _class = interaction.values[0];

    const user = await school.findOne({ id, guildId });

    if (!user) {
      const newSchoolInfo = new school({ id, guildId, name, cityCode, cityName, schoolCode, schoolName, grade, class: _class });
      newSchoolInfo.save();
      interaction.reply('성공적으로 유저 정보를 등록했습니다!');
    } else {
      (await client.models.school.updateOne({ id, guildId }, { $set: { cityCode, cityName, schoolCode, schoolName, grade, class: _class } })).matchedCount;
      interaction.reply('성공적으로 유저 정보를 업데이트했습니다!');
    }
  },
});