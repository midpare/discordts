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
    name: '하프',
    aliases: ['ㅎㅍ'],
    category: '도박',
    usage: '하프',
    description: '자신의 돈의 절반을 걸고 도박을 진행합니다. (성공시: 2배, 실패시: 0배)',
    execute: ({ msg, args }) => __awaiter(void 0, void 0, void 0, function* () {
        const id = msg.author.id;
        const user = yield gambling_1.gambling.findOne({ id });
        if (user.money == 0)
            return msg.reply(message_1.messages.noneMoney);
        const money = Math.floor(user.money);
        const random = Math.floor(Math.random() * 2);
        if (random == 1) {
            (yield gambling_1.gambling.updateOne({ id }, { $set: { money: Math.floor(money * 1.5) } })).matchedCount;
            msg.reply(message_1.messages.gambling.successGamb(user.money, Math.round(user.money * 0.5)));
        }
        else if (random == 0) {
            (yield gambling_1.gambling.updateOne({ id }, { $set: { money: Math.floor(money * 0.5) } })).matchedCount;
            msg.reply(message_1.messages.gambling.failureGamb(user.money, Math.round(user.money * 0.5)));
        }
    }),
});
