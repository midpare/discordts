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
const SlashCommand_1 = require("../../managers/SlashCommand");
const Utils_1 = require("../../structures/Utils");
exports.default = new SlashCommand_1.SlashCommand({
    name: '출석체크',
    aliases: ['출첵', 'ㅊㅊ'],
    category: '도박',
    description: '하루에 한번 50,000 ~ 100,000만원의 돈을 획득합니다.',
    execute: ({ interaction, client }) => __awaiter(void 0, void 0, void 0, function* () {
        const { guildId, user: { id } } = interaction;
        const user = yield client.models.gambling.findOne({ id, guildId });
        const date = new Date();
        const today = '' + date.getFullYear() + date.getMonth() + date.getDate();
        if (user.date == today) {
            Utils_1.Utils.reply(interaction, client.messages.gambling.daily.today);
            return;
        }
        const money = Math.floor(Math.random() * 50000 + 50000);
        (yield client.models.gambling.updateOne({ id, guildId }, { $inc: { money }, $set: { date: today } })).matchedCount;
        interaction.reply(client.messages.gambling.daily.success(user.money, money));
    }),
});
