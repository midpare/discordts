"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Commands_1 = require("../../structures/Commands");
const voice_1 = require("@discordjs/voice");
const Music_1 = require("../../structures/Music");
exports.default = new Commands_1.Command({
    name: 'join',
    category: '노래',
    usage: 'join',
    description: '봇이 음성채널에 들어갑니다.',
    execute: ({ msg, args }) => {
        const channel = msg.member.voice.channel;
        if (!channel)
            return msg.reply('음성채널에 접속해주시기 바랍니다.');
        if (channel.id == Music_1.music.channelId)
            return msg.reply('이미 음성채널에 접속돼있습니다.');
        const connection = Music_1.music.voiceChannel(channel);
        (0, voice_1.entersState)(connection, voice_1.VoiceConnectionStatus.Ready, 30000);
        Music_1.music.channelId = channel.id;
        msg.reply('성공적으로 음성채널에 접속했습니다!');
    },
});
