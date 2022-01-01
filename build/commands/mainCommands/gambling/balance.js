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
    name: '잔액',
    aliases: ['돈', '보유금액'],
    category: 'gambling',
    use: '잔액',
    description: '자신의 현재 잔액을 확인합니다.',
    execute: ({ msg, args }) => __awaiter(void 0, void 0, void 0, function* () {
        const id = msg.author.id;
        const user = yield gambling_1.gambling.findOne({ id });
        msg.reply(`${user.name} 님의 잔액은 ${user.money.toLocaleString()}원입니다.`);
    })
};
