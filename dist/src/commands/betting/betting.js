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
const Commands_1 = require("../../managers/Commands");
exports.default = new Commands_1.Command({
    name: '베팅',
    category: '베팅',
    usage: '베팅',
    description: '베팅을 합니다.',
    execute: ({ msg, args, client }) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const guildId = (_a = msg.guildId) !== null && _a !== void 0 ? _a : '';
        const money = parseFloat(args[1]);
        const betting = client.betting.get(guildId);
        if (!betting) {
            msg.reply('아직 베팅을 시작하지 않았습니다.');
            return;
        }
        if (!money) {
            msg.reply('정확한 돈을 입력해주시기바랍니다.');
            return;
        }
        if (!Number.isInteger(money) || money == 0) {
            msg.reply('정확한 정수를 입력해주시기바랍니다.');
            return;
        }
        switch (args[0]) {
            case betting.bet1.name:
                betting.bet1.addUser(msg, msg.author, money);
                break;
            case betting.bet2.name:
                betting.bet2.addUser(msg, msg.author, money);
                break;
            default:
                return;
        }
    }),
});
