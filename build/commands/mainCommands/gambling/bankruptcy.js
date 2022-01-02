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
    name: '파산',
    category: 'gambling',
    usage: '파산',
    description: '모든 돈과 빚을 0원으로 만들고 3일간 도박을 하지 못합니다.',
    execute: ({ msg, args }) => __awaiter(void 0, void 0, void 0, function* () {
        const id = msg.author.id;
        const user = yield gambling_1.gambling.findOne({ id });
        const date = new Date();
        const today = (0, function_1.dateCal)(date, 0);
        gambling_1.gambling.updateOne({ id }, { $set: { bankruptcy: today, money: 0, debt: 0 } }).then(() => {
            msg.reply(`성공적으로 ${user.name}님이 파산했습니다!`);
        });
    })
};
