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
    name: '도박',
    category: 'gambling',
    use: '도박 <돈>',
    description: '자신의 <돈>을 걸고 도박을 진행합니다. (성공시: 2배, 실패시: 0배)',
    execute: ({ msg, args }) => __awaiter(void 0, void 0, void 0, function* () {
        const id = msg.author.id;
        const money = parseFloat(args[0]);
        if (!Number.isInteger(money) || money <= 0)
            return msg.reply('정확한 자연수를 입력해주시길 바랍니다.');
        const user = yield gambling_1.gambling.findOne({ id });
        if (!user)
            return msg.reply('가입되지 않은 유저입니다 !가입 을 통해 가입해주시기 바랍니다.');
        if (money > user.money)
            return msg.reply(`현재 잔액보다 높은 돈은 입력하실 수 없습니다.  \n현재잔액: ${user.money}원`);
        const random = Math.floor(Math.random() * 2);
        if (random == 1) {
            gambling_1.gambling.updateOne({ id }, { $inc: { money: money } })
                .then(() => msg.reply(`도박에 성공하셨습니다! ${money.toLocaleString()}원이 지급되었습니다. \n현재 잔액: ${user.money.toLocaleString()}원 -> ${(user.money + money).toLocaleString()}원`));
        }
        else if (random == 0) {
            gambling_1.gambling.updateOne({ id }, { $inc: { money: -money } })
                .then(() => msg.reply(`도박에 실패하셨습니다! ${money.toLocaleString()}원이 차감되었습니다. \n현재 잔액: ${user.money.toLocaleString()}원 -> ${(user.money - money).toLocaleString()}원`));
        }
    })
};
