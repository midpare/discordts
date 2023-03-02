import { ButtonInteraction } from 'discord.js';
import { Interaction } from '../../managers/Interaction';

export default new Interaction<ButtonInteraction, null>({
  name: 'vote',
  execute: async ({ interaction, options, client }) => {
    const { user: { id } } = interaction;
    const vote = await client.models.vote.findOne({ id })
    const score = parseInt(interaction.customId.split(' ')[1]) + 1;

    if (!vote) {
      const newUser = new client.models.vote({ id, score });
      await newUser.save();
    } else {
      (await client.models.vote.updateOne({ id }, { $set: { score } })).matchedCount;
    }

    interaction.reply({ content: `성공적으로 결과가 반영되었습니다!\n점수: ${score}점`, ephemeral: true });
    console.log(await client.models.vote.findOne({ id }));
  },
});