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
const gambling_1 = require("../../../models/gambling");
const Commands_1 = require("../../../structures/Commands");
exports.default = new Commands_1.Command({
    name: '올인',
    aliases: ['allIn'],
    category: 'gambling',
    usage: '올인',
    description: '자신의 모든 돈을 걸고 도박을 진행합니다. (성공시: 2배, 실패시: 0배)',
    execute: ({ msg, args }) => __awaiter(void 0, void 0, void 0, function* () {
        const id = msg.author.id;
        const user = yield gambling_1.gambling.findOne({ id });
        if (user.money == 0)
            return msg.reply('돈이 없을때는 도박을 할 수 없습니다.');
        const random = Math.floor(Math.random() * 2);
        if (random == 1) {
            (yield gambling_1.gambling.updateOne({ id }, { $mul: { money: 2 } })).matchedCount;
            msg.reply(`도박에 성공하셨습니다! ${user.money.toLocaleString()}원이 지급되었습니다. \n현재 잔액: ${user.money.toLocaleString()}원 -> ${(user.money * 2).toLocaleString()}원`);
        }
        else if (random == 0) {
            (yield gambling_1.gambling.updateOne({ id }, { $set: { money: 0 } })).matchedCount;
            msg.reply(`도박에 실패하셨습니다! 모든 돈을 잃었습니다. \n현재 잔액 ${user.money.toLocaleString()}원 -> 0원`);
        }
    }),
});
