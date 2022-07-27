import { Interaction } from '../managers/Interaction';

export default new Interaction({
  name: 'bankrupcty',
  deleted: true,
  execute: async ({ interaction, client }) => {
    (await client.models.gambling.updateOne({ id: interaction.user.id }, { $set: { bankruptcy: new Date().getTime(), money: 0, debt: 0, principalDebt: 0, stock: [] } })).matchedCount;
    interaction.reply(`${interaction.user.username}님이 파산했습니다!`);
  }
})