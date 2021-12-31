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
const gambling_1 = require("../../../models/gambling");
module.exports = {
    name: '송금',
    aliases: ['이체', '돈보내기'],
    category: 'gambling',
    use: '송금 <유저> <돈>',
    description: '자신의 돈을 맨션한 <유저>에게 <돈>만큼 송금합니다.',
    execute: ({ msg, args }) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const id = msg.author.id;
        const user = yield gambling_1.gambling.findOne({ id });
        const target = (_a = msg.mentions.members) === null || _a === void 0 ? void 0 : _a.first();
        if (!target)
            return msg.reply('송금할 유저를 맨션해주시기바랍니다.');
        const targetUser = yield gambling_1.gambling.findOne({ id: target.id });
        if (!targetUser)
            return msg.reply('송금할 유저가 가입을 하지 않았습니다.');
        if (!args[1])
            return msg.reply('송금할 금액을 입력해주시기바랍니다.');
        const money = parseFloat(args[1]);
        if (!Number.isInteger(money) || money <= 0)
            return msg.reply('정확한 금액을 입력해주시기바랍니다.');
        if (user.money < money)
            return msg.reply(`송금하려는 금액이 현재 잔액보다 많습니다\n현재 잔액: ${user.money}원`);
        (yield gambling_1.gambling.updateOne({ id }, { $inc: { money: -money } })).matchedCount;
        (yield gambling_1.gambling.updateOne({ id: target.id }, { $inc: { money: money } })).matchedCount;
        msg.reply(`성공적으로 ${target.user.username}님에게 ${money.toLocaleString()}원을 송금했습니다!`);
    })
};