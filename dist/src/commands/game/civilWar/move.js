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
const Client_1 = require("../../../structures/Client");
const Commands_1 = require("../../../structures/Commands");
const CivilWar_1 = require("../../../util/structures/CivilWar");
exports.default = new Commands_1.Command({
    name: '내전 이동',
    aliases: ['내전 시작'],
    category: '게임',
    usage: '내전 이동',
    description: '팀을 나눈 유저들을 내전방으로 이동시킵니다.',
    execute: ({ msg, args }) => __awaiter(void 0, void 0, void 0, function* () {
        if (!CivilWar_1.civilWar.team1[0])
            return msg.reply('이동할 멤버가 없습니다.');
        let team1 = CivilWar_1.civilWar.team1;
        let team2 = CivilWar_1.civilWar.team2;
        const channel1 = Client_1.client.channels.cache.get('910521120158019624');
        const channel2 = Client_1.client.channels.cache.get('910521120158019625');
        for (const user of team1) {
            if (!user.voice || user.voice.channelId == null)
                continue;
            user.voice.setChannel(channel1);
        }
        for (const user of team2) {
            if (!user.voice || user.voice.channelId == null)
                continue;
            user.voice.setChannel(channel2);
        }
    }),
});
