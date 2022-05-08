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
exports.default = new Commands_1.Command({
    name: '기초자금',
    aliases: ['초기자금', '돈', 'ㄷ'],
    category: '도박',
    usage: '기초자금',
    description: '기초자금 25,000원을 획득합니다. 돈이 0원일때만 명령어 사용이 가능합니다. 쿨타임: 30초',
    execute: ({ msg, args, client }) => __awaiter(void 0, void 0, void 0, function* () {
        const id = msg.author.id;
        const user = yield gambling_1.gambling.findOne({ id });
        if (user.money != 0 || user.stock[0])
            return msg.reply(client.messages.gambling.baseMoney.haveMoney);
        const second = new Date().getTime();
        const coolTime = 30;
        if (user.baseMoneyCoolTime) {
            const userCoolTime = user.baseMoneyCoolTime;
            if ((second - userCoolTime) / 1000 < coolTime)
                return msg.reply(client.messages.coolTime(Math.ceil(coolTime - (second - userCoolTime) / 1000)));
        }
        const baseMoney = 25000;
        (yield gambling_1.gambling.updateOne({ id }, { $set: { money: baseMoney, baseMoneyCoolTime: second } })).matchedCount;
        msg.reply(client.messages.gambling.baseMoney.success(baseMoney));
    }),
});
