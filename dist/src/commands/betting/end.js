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
const Commands_1 = require("../../structures/Commands");
exports.default = new Commands_1.Command({
    name: '베팅 종료',
    category: '베팅',
    usage: '베팅 종료 <팀>',
    description: '베팅을 종료합니다.',
    execute: ({ msg, args, client }) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const id = (_a = msg.guildId) !== null && _a !== void 0 ? _a : '';
        const betting = client.betting.get(id);
        if (!betting)
            return msg.reply('아직 베팅을 시작하지 않았습니다.');
        const bet1 = betting.bet1;
        const bet2 = betting.bet2;
        const winner = args[0];
        if (winner != bet1.name && winner != bet2.name)
            return msg.reply(`${bet1.name}과 ${bet2.name}중 승리팀을 선택해주시기 바랍니다.`);
        switch (winner) {
            case bet1.name:
                betting.end('bet1');
                break;
            case bet2.name:
                betting.end('bet2');
                break;
        }
        msg.channel.send(`${winner}팀이 승리했습니다!`);
        client.betting.delete(id);
    }),
});
