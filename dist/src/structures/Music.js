"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.music = exports.Music = void 0;
const voice_1 = require("@discordjs/voice");
class Music {
    constructor() {
        this.channelId = null;
    }
    voiceChannel(channel) {
        return (0, voice_1.joinVoiceChannel)({
            guildId: channel.guild.id,
            channelId: channel.id,
            adapterCreator: channel.guild.voiceAdapterCreator,
            selfDeaf: false,
        });
    }
}
exports.Music = Music;
exports.music = new Music();
