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
const gambling_1 = require("../../models/gambling");
const Commands_1 = require("../../structures/Commands");
const message_1 = require("../../util/language/message");
exports.default = new Commands_1.Command({
    name: '도박',
    aliases: ['ㄷㅂ'],
    category: '도박',
    usage: '도박 <돈>',
    description: '자신의 <돈>을 걸고 도박을 진행합니다. (성공시: 2배, 실패시: 0배)',
    execute: ({ msg, args }) => __awaiter(void 0, void 0, void 0, function* () {
        const id = msg.author.id;
        const money = parseFloat(args[0]);
        if (!Number.isInteger(money) || money <= 0)
            return msg.reply(message_1.messages.naturalNumber);
        const user = yield gambling_1.gambling.findOne({ id });
        if (money > user.money)
            return msg.reply(message_1.messages.overMoney(user.money));
        const random = Math.floor(Math.random() * 2);
        if (random == 1) {
            (yield gambling_1.gambling.updateOne({ id }, { $inc: { money: money } })).matchedCount;
            msg.reply(message_1.messages.gambling.successGamb(user.money, money));
        }
        else if (random == 0) {
            (yield gambling_1.gambling.updateOne({ id }, { $inc: { money: -money } })).matchedCount;
            msg.reply(message_1.messages.gambling.failureGamb(user.money, money));
        }
    }),
});
