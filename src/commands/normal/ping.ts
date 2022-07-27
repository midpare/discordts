import { Command } from '../../managers/Commands';
import { bold, italic, strikethrough, underscore, spoiler, quote, blockQuote } from 'discord.js';
export default new Command({
  name: 'ping',
  category: '기본',
  usage: 'ping',
  description: '봇의 작동가능여부를 확인합니다.',
  execute: async ({ msg }) => {
    msg.reply('pong!');
  },
});
