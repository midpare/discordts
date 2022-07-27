import { Command } from '../../managers/Commands';
import { bold, italic, strikethrough, underscore, spoiler, quote, blockQuote } from 'discord.js';
export default new Command({
  name: 'ping',
  category: '기본',
  usage: 'ping',
  description: '봇의 작동가능여부를 확인합니다.',
  execute: ({ msg }) => {
    const string = 'Hello!';

    const boldString = bold('bold');
    const italicString = italic('italic');
    const strikethroughString = strikethrough('strikethrough');
    const underscoreString = underscore('underscore');
    const spoilerString = spoiler('spoiler');
    const quoteString = quote('quote');
    const blockquoteString = blockQuote('blockQuote');
    msg.channel.send(boldString)
    msg.channel.send(italicString)
    msg.channel.send(strikethroughString)
    msg.channel.send(underscoreString)
    msg.channel.send(spoilerString)
    msg.channel.send(quoteString)
    msg.channel.send(blockquoteString)
  },
});
