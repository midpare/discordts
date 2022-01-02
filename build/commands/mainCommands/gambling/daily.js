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
const function_1 = require("../../../handler/function");
module.exports = {
    name: '출석체크',
    category: 'gambling',
    usage: '출석체크',
    description: '하루에 한번 50,000 ~ 100,000만원의 돈을 획득합니다.',
    execute: ({ msg, args }) => __awaiter(void 0, void 0, void 0, function* () {
        const id = msg.author.id;
        const user = yield gambling_1.gambling.findOne({ id });
        const date = new Date();
        const today = (0, function_1.dateCal)(date, 0);
        if (user.date == parseFloat(today))
            return msg.reply('오늘은 이미 받았습니다.');
        const money = Math.floor(Math.random() * (50000) + 50000);
        gambling_1.gambling.updateOne({ id }, { $inc: { money }, $set: { date: today } })
            .then(() => msg.reply(`${money.toLocaleString()}원이 지급됐습니다!\n${user.name}의 현재 잔액은 ${user.money.toLocaleString()}원 -> ${(user.money + money).toLocaleString()} 원입니다.`));
    })
};
