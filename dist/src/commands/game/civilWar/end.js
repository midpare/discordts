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
const Command_1 = require("../../../managers/Command");
exports.default = new Command_1.Command({
    name: '내전종료',
    aliases: ['내전끝'],
    category: '게임',
    usage: '내전종료',
    description: '내전을 종료합니다.',
    execute: ({ interaction, client }) => __awaiter(void 0, void 0, void 0, function* () {
        const civilWar = client.civilWar;
        for (const user of civilWar.teams.flat()) {
            if (!user.voice || user.voice.channelId == null)
                continue;
            user.voice.setChannel(civilWar.channel);
        }
        civilWar.clear();
        interaction.reply('성공적으로 내전을 종료했습니다!');
    })
});
