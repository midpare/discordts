import { Interaction } from '../../managers/Interaction';

export default new Interaction({
  name: 'enforce_sell',
  deleted:  true,
  execute: async ({ interaction, options, client }) => {
    const { guildId, user: { id } } = interaction;
    const { item, money } = options?.data;

    (await client.models.gambling.updateOne({ id, guildId }, { $pull: { items: item }, $inc: { money } })).matchedCount;
    options?.messages[0].edit(`${interaction.user.username}님이 파산했습니다!`);
    
    interaction.deferUpdate();  
  },
});