import { SlashCommand } from "../managers/SlashCommand";

export default new SlashCommand({
  name: 'ping',
  description: '봇의 작동가능여부를 확인합니다.',
  execute: async ({ interaction, client }) => {
    interaction.reply('pong!');
  }
})