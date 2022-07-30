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
const Commands_1 = require("../../managers/Commands");
exports.default = new Commands_1.Command({
    name: '빚갚기',
    aliases: ['돈갚기'],
    category: '도박',
    usage: '빚갚기 <돈>',
    description: '자신의 빚을 갚습니다.',
    execute: ({ msg, args, client }) => __awaiter(void 0, void 0, void 0, function* () {
        const id = msg.author.id;
        const user = yield client.models.gambling.findOne({ id });
        const money = parseFloat(args[0]);
        if (!Number.isInteger(money) || money <= 0) {
            msg.reply(client.messages.naturalNumber);
            return;
        }
        if (user.money < money) {
            msg.reply(client.messages.overMoney(user.money));
            return;
        }
        if (user.debt < money) {
            msg.reply(client.messages.gambling.payBack.overMoney(user.debt));
            return;
        }
        (yield client.models.gambling.updateOne({ id }, { $inc: { money: -money, debt: -money } })).matchedCount;
        msg.reply(client.messages.gambling.payBack.success(user.debt, money));
    }),
});
