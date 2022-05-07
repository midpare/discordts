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
const Commands_1 = require("../../managers/Commands");
const message_1 = require("../../util/language/message");
exports.default = new Commands_1.Command({
    name: '출석체크',
    aliases: ['출첵', 'ㅊㅊ'],
    category: '도박',
    usage: '출석체크',
    description: '하루에 한번 50,000 ~ 100,000만원의 돈을 획득합니다.',
    execute: ({ msg, args, client }) => __awaiter(void 0, void 0, void 0, function* () {
        const id = msg.author.id;
        const user = yield gambling_1.gambling.findOne({ id });
        const date = new Date();
        const today = '' + date.getFullYear() + date.getMonth() + date.getDate();
        if (user.date == today)
            return msg.reply(message_1.messages.gambling.daily.today);
        const money = Math.floor(Math.random() * 50000 + 50000);
        (yield gambling_1.gambling.updateOne({ id }, { $inc: { money }, $set: { date: today } })).matchedCount;
        msg.reply(message_1.messages.gambling.daily.success(user.money, money));
    }),
});
