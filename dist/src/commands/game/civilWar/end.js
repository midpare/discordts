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
    name: '내전 종료',
    aliases: ['내전 끝'],
    category: '게임',
    usage: '내전 종료',
    description: '내전을 종료합니다.',
    execute: ({ msg, client }) => __awaiter(void 0, void 0, void 0, function* () {
        const civilWar = client.civilWar;
        for (const user of civilWar.teams.flat()) {
            if (!user.voice || user.voice.channelId == null)
                continue;
            user.voice.setChannel(civilWar.channel);
        }
        civilWar.clear();
    })
});
