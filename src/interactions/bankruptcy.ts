import { Interaction } from '../managers/Interaction';

export default new Interaction({
  name: 'bankrupcty',
  deleted: true,
  execute: async ({ interaction, options, client }) => {
    (await client.models.gambling.updateOne({ id: interaction.user.id }, { $set: { bankruptcyTime: new Date().getTime(), money: 0, debt: 0, coin: [] } })).matchedCount;
    options?.messages[0].edit(`${interaction.user.username}님이 파산했습니다!`);
    interaction.deferUpdate();  
  },
});