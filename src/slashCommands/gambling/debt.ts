import { Command } from '../../managers/Commands';
import { SlashCommand } from '../../managers/SlashCommand';

export default new SlashCommand({
  name: '빚',
  category: '도박',
  description: '자신의 현재 빚을 확인합니다.',
  execute: async ({ interaction, client }) => {
    const id = interaction.user.id;
    const user = await client.models.gambling.findOne({ id });
    interaction.reply(client.messages.gambling.debt(user.name, user.debt));
  },
});