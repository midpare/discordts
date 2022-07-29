import { SlashCommand } from "../managers/SlashCommand";

export default new SlashCommand({
  name: 'ping',
  description: '봇의 현재상태를 확인합니다',
  execute: async ({ interaction, options, client }) => {
    interaction.reply('pong!');
  },
});