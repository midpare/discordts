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
const gambling_1 = require("../../../models/gambling");
const Commands_1 = require("../../../structures/Commands");
exports.default = new Commands_1.Command({
    name: '빚갚기',
    aliases: ['돈갚기'],
    category: 'gambling',
    usage: '빚갚기 <돈>',
    description: '자신의 빚을 갚습니다.',
    execute: ({ msg, args }) => __awaiter(void 0, void 0, void 0, function* () {
        const id = msg.author.id;
        const user = yield gambling_1.gambling.findOne({ id });
        if (!args[0])
            return msg.reply('정확한 금액을 입력해주시기바랍니다.');
        const money = parseFloat(args[0]);
        if (!Number.isInteger(money) || money <= 0)
            return msg.reply('정확한 금액을 입력해주시기바랍니다.');
        if (user.money < money)
            return msg.reply(`갚으려는 금액이 현재 금액보다 많습니다.\n현재 잔액: ${user.money}원`);
        if (user.debt < money)
            return msg.reply(`갚으려는 금액이 현재 빚보다 많습니다.\n현재 빚:${user.debt}원`);
        (yield gambling_1.gambling.updateOne({ id }, { $inc: { money: -money, debt: -money } })).matchedCount;
        msg.reply(`성공적으로 빚을 ${money.toLocaleString()}원 갚았습니다!\n현재 빚: ${user.debt.toLocaleString()}원 -> ${(user.debt - money).toLocaleString()}원`);
    }),
});
