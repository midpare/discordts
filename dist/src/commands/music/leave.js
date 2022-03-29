"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Commands_1 = require("../../structures/Commands");
const Music_1 = require("../../structures/Music");
exports.default = new Commands_1.Command({
    name: 'leave',
    category: '노래',
    usage: 'leave',
    description: '봇이 음성채널에서 나갑니다.',
    execute: ({ msg, args }) => {
        const channel = msg.member.voice.channel;
        if (!channel)
            return msg.reply('음성채널에 접속해주시기 바랍니다.');
        if (channel.id != Music_1.music.channelId)
            return msg.reply('이 채널에는 봇이 접속해있지 않습니다.');
        Music_1.music.voiceChannel(channel).disconnect();
        Music_1.music.channelId = null;
        msg.reply('성공적으로 음성채널에서 나갔습니다!');
    },
});
