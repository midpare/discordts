"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Commands_1 = require("../../managers/Commands");
const discord_js_1 = require("discord.js");
exports.default = new Commands_1.Command({
    name: 'ping',
    category: '기본',
    usage: 'ping',
    description: '봇의 작동가능여부를 확인합니다.',
    execute: ({ msg }) => {
        const string = 'Hello!';
        const boldString = (0, discord_js_1.bold)('bold');
        const italicString = (0, discord_js_1.italic)('italic');
        const strikethroughString = (0, discord_js_1.strikethrough)('strikethrough');
        const underscoreString = (0, discord_js_1.underscore)('underscore');
        const spoilerString = (0, discord_js_1.spoiler)('spoiler');
        const quoteString = (0, discord_js_1.quote)('quote');
        const blockquoteString = (0, discord_js_1.blockQuote)('blockQuote');
        msg.channel.send(boldString);
        msg.channel.send(italicString);
        msg.channel.send(strikethroughString);
        msg.channel.send(underscoreString);
        msg.channel.send(spoilerString);
        msg.channel.send(quoteString);
        msg.channel.send(blockquoteString);
    },
});
