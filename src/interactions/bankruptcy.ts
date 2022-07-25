import { InteractionCommand } from "../managers/Interaction";
import { gambling } from "../models/gambling";

export default new InteractionCommand({
  name: 'bankrupcty',
  private: true,
  execute: async ({ interaction, options, client }) => {
    (await gambling.updateOne({ id: interaction.user.id }, { $set: { bankruptcy: new Date().getTime(), money: 0, debt: 0, principalDebt: 0, stock: [] } })).matchedCount;
    interaction.reply(`${interaction.user.username}님이 파산했습니다!`);
  }
})