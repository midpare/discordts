import { Interaction } from '../managers/Interaction';

export default new Interaction({
  name: 'bankrupcty',
  execute: async ({ interaction, options, client }) => {
    const { guildId, user: { id } } = interaction;
    options.message.edit(`${interaction.user.username}님이 파산했습니다!`);

    interaction.deferUpdate();  
    (await client.models.gambling.updateOne({ id, guildId }, { $set: { bankruptcyTime: new Date().getTime(), money: 0, debt: 0, coin: [] } })).matchedCount;
  },
});