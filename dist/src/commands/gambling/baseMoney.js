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
    name: '기초자금',
    aliases: ['초기자금', '돈', 'ㄷ', '기본자금'],
    category: '도박',
    usage: '기초자금',
    description: '기초자금 25,000원을 획득합니다. 돈이 0원일때만 명령어 사용이 가능합니다. 쿨타임: 30초',
    execute: ({ msg, client }) => __awaiter(void 0, void 0, void 0, function* () {
        const id = msg.author.id;
        const user = yield client.models.gambling.findOne({ id });
        if (!user)
            return;
        if (user.money != 0 || user.stock[0]) {
            msg.reply(client.messages.gambling.baseMoney.haveMoney);
            return;
        }
        const time = new Date().getTime();
        const coolTime = 30 * 1000;
        const userCoolTime = user.baseMoneyCoolTime;
        if (time - userCoolTime < coolTime) {
            msg.reply(client.messages.coolTime(Math.ceil(coolTime - (time - userCoolTime) / 1000)));
            return;
        }
        const baseMoney = 25000;
        (yield client.models.gambling.updateOne({ id }, { $set: { money: baseMoney, baseMoneyCoolTime: time } })).matchedCount;
        msg.reply(client.messages.gambling.baseMoney.success(baseMoney));
    }),
});
