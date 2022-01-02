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
    name: '가입',
    category: 'gambling',
    usage: '가입',
    description: '도박 관련 명령어를 사용할수있게 가입을 합니다.',
    execute: ({ msg, args }) => __awaiter(void 0, void 0, void 0, function* () {
        const id = msg.author.id;
        const name = msg.author.username;
        const today = new Date();
        const date = '' + today.getFullYear() + today.getMonth() + (today.getDate() - 1);
        const user = yield gambling_1.gambling.findOne({ id });
        if (user)
            return msg.reply('이미 가입된 유저입니다.');
        const newUser = new gambling_1.gambling({ id, name, date, money: 0, debt: 0, gamLevel: 1 });
        newUser.save()
            .then(() => msg.reply('성공적으로 가입이 완료되었습니다!'));
    })
};
