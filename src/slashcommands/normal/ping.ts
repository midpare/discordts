import { Command } from '../../managers/Command';

export default new Command({
  name: 'ping',
  category: '기본',
  usage: 'ping',
  description: '봇의 현재상태를 확인합니다',
  execute: async ({ interaction }) => {
    interaction.reply('pong!');
  },
});