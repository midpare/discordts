"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Commands_1 = require("../../../managers/Commands");
exports.default = new Commands_1.Command({
    name: '내전 이동',
    category: '게임',
    usage: '내전 이동',
    description: '팀을 나눈 유저들을 내전방으로 이동시킵니다.',
    execute: ({ msg, client }) => __awaiter(void 0, void 0, void 0, function* () {
        const civilWar = client.civilWar;
        if (civilWar.isEmpty()) {
            msg.reply('이동할 멤버가 없습니다.');
            return;
        }
        const channel1 = client.channels.cache.get('1000704196552704010');
        const channel2 = client.channels.cache.get('1000704543652323328');
        for (const user of civilWar.teams[0]) {
            if (!user.voice || user.voice.channelId == null)
                continue;
            user.voice.setChannel(channel1);
        }
        for (const user of civilWar.teams[1]) {
            if (!user.voice || user.voice.channelId == null)
                continue;
            user.voice.setChannel(channel2);
        }
    }),
});
