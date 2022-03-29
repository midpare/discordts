"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Client_1 = require("../../../structures/Client");
const Commands_1 = require("../../../structures/Commands");
const CivilWar_1 = require("../../../util/structures/CivilWar");
exports.default = new Commands_1.Command({
    name: '내전 종료',
    aliases: ['내전 끝'],
    category: '게임',
    usage: '내전 종료',
    description: '내전을 종료합니다.',
    execute: ({ msg, args }) => {
        var _a;
        const channel = Client_1.client.channels.cache.get(((_a = msg.mentions.channels.first()) === null || _a === void 0 ? void 0 : _a.id) || '');
        if (!channel || !channel.isVoice())
            return msg.reply('정확한 음성채널을 맨션해주시기 바랍니다.');
        for (const user of CivilWar_1.civilWar.allTeam) {
            if (!user.voice || user.voice.channelId == null)
                continue;
            user.voice.setChannel(channel);
        }
    }
});
