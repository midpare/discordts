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
    name: '기초자금',
    aliases: ['초기자금'],
    category: 'gambling',
    usage: '기초자금',
    description: '기초자금 25,000원을 획득합니다. 돈이 0원일때만 명령어 사용이 가능합니다. 쿨타임: 60초',
    execute: ({ msg, args }) => __awaiter(void 0, void 0, void 0, function* () {
        const id = msg.author.id;
        const user = yield gambling_1.gambling.findOne({ id });
        if (user.money != 0 || user.stock[0])
            return msg.reply('보유하신 돈이나 코인이 있어 기초자금을 지급할 수 없습니다.');
        const date = new Date();
        const second = date.getTime();
        const coolTime = 30;
        if (user.baseMoneyCoolTime) {
            const userCoolTime = user.baseMoneyCoolTime;
            if ((second - userCoolTime) / 1000 < coolTime)
                return msg.reply(`명령어의 쿨타임이 ${Math.ceil(coolTime - (second - userCoolTime) / 1000)}초 남았습니다.`);
        }
        const baseMoney = 25000;
        gambling_1.gambling.updateOne({ id }, { $set: { money: baseMoney, baseMoneyCoolTime: second } })
            .then(() => msg.reply(`기초자금 ${baseMoney.toLocaleString()}원이 지급되었습니다!`));
    })
};
