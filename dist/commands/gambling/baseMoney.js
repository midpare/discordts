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
const Command_1 = require("../../managers/Command");
const Utils_1 = require("../../structures/Utils");
exports.default = new Command_1.Command({
    name: '기초자금',
    aliases: ['초기자금', '돈', 'ㄷ', '기본자금'],
    category: '도박',
    description: '기초자금 25,000원을 획득합니다. 돈이 0원일때만 명령어 사용이 가능합니다. 쿨타임: 30초',
    execute: ({ interaction, client }) => __awaiter(void 0, void 0, void 0, function* () {
        const { guildId, user: { id } } = interaction;
        const user = yield client.models.gambling.findOne({ id, guildId });
        if (!user)
            return;
        if (user.money > 0 || user.coin[0]) {
            Utils_1.Utils.reply(interaction, client.messages.gambling.baseMoney.haveMoney);
            return;
        }
        const time = new Date().getTime();
        const coolTime = 30 * 1000;
        const userTime = user.baseMoneyTime;
        if (time - userTime < coolTime) {
            Utils_1.Utils.reply(interaction, client.messages.coolTime(Math.round((coolTime - (time - userTime)) / 1000)));
            return;
        }
        const baseMoney = 25000;
        (yield client.models.gambling.updateOne({ id, guildId }, { $set: { money: baseMoney, baseMoneyTime: time } })).matchedCount;
        interaction.reply(client.messages.gambling.baseMoney.success(baseMoney));
    }),
});
