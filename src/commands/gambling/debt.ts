import { Command } from '../../managers/Command';

export default new Command({
  name: '빚',
  category: '도박',
  description: '자신의 현재 빚을 확인합니다.',
  execute: async ({ interaction, client }) => {
    const { guildId, user: { id } } = interaction;
    const user = await client.models.gambling.findOne({ id, guildId });
    interaction.reply(client.messages.gambling.debt(user.name, user.debt));
    return 1;
  },
});