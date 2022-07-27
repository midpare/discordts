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
    name: '송금',
    aliases: ['이체', '돈보내기'],
    category: '도박',
    usage: '송금 <유저> <돈>',
    description: '자신의 돈을 맨션한 <유저>에게 <돈>만큼 송금합니다.',
    execute: ({ msg, args, client }) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const id = msg.author.id;
        const user = yield client.models.gambling.findOne({ id });
        const target = (_a = msg.mentions.members) === null || _a === void 0 ? void 0 : _a.first();
        if (!target) {
            msg.reply('송금할 유저를 맨션해주시기 바랍니다.');
            return;
        }
        const targetUser = yield client.models.gambling.findOne({ id: target.id });
        if (!targetUser) {
            msg.reply('송금할 유저가 가입을 하지 않았습니다.');
            return;
        }
        const money = parseFloat(args[1]);
        if (!Number.isInteger(money) || money <= 0) {
            msg.reply('정확한 금액을 입력해주시기 바랍니다.');
            return;
        }
        if (user.money < money) {
            msg.reply(`현재 잔액보다 높은 돈은 입력하실 수 없습니다. \n현재 잔액: ${user.money.toLocaleString()}원`);
            return;
        }
        (yield client.models.gambling.updateOne({ id }, { $inc: { money: -money } })).matchedCount;
        (yield client.models.gambling.updateOne({ id: target.id }, { $inc: { money: money } })).matchedCount;
        msg.reply(`성공적으로 ${targetUser.name}님에게 ${money.toLocaleString()}원을 송금했습니다!`);
    }),
});
