import { Command } from '../../managers/Command';
import { Utils } from '../../structures/Utils';

export default new Command({
  name: '가입',
  category: '도박',
  description: '도박 관련 명령어를 사용할수있게 가입을 합니다.',
  execute: async ({ interaction, client }) => {
    const { guildId, user: { id }} = interaction
    const user = await client.models.gambling.findOne({ id, guildId });
    if (user) {
      Utils.reply(interaction, client.messages.gambling.join.alreadyJoin);
      return;
    }
    const name = interaction.user.username;

    const newUser = new client.models.gambling({ id, name, guildId, coin: [] });
    await newUser.save();
    interaction.reply(client.messages.gambling.join.success);
  },
}); 