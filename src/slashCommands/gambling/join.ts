import { SlashCommand } from '../../managers/SlashCommand';
import { Utils } from '../../structures/Utils';

export default new SlashCommand({
  name: '가입',
  category: '도박',
  description: '도박 관련 명령어를 사용할수있게 가입을 합니다.',
  execute: async ({ interaction, client }) => {
    const { guildId, user: { id, username: name }} = interaction
    const user = await client.models.gambling.findOne({ id });
    if (user) {
      Utils.reply(interaction, client.messages.gambling.join.alreadyJoin);
      return;
    }

    const newUser = new client.models.gambling({ id, name, guild: guildId, stock: [] });
    await newUser.save();
    interaction.reply(client.messages.gambling.join.success);
  },
}); 