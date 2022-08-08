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
const discord_js_1 = require("discord.js");
const Command_1 = require("../../managers/Command");
const Utils_1 = require("../../structures/Utils");
exports.default = new Command_1.Command({
    name: '도박',
    aliases: ['ㄷㅂ'],
    category: '도박',
    usage: '도박 <돈>',
    description: '자신의 <돈>을 걸고 도박을 진행합니다. (성공시: 2배, 실패시: 0배)',
    options: [
        {
            name: '돈',
            description: '도박할 돈을 입력합니다.',
            type: discord_js_1.ApplicationCommandOptionType.Integer,
            required: true,
            min_value: 1,
        },
    ],
    execute: ({ interaction, options, client }) => __awaiter(void 0, void 0, void 0, function* () {
        const { guildId, user: { id } } = interaction;
        const money = options.getInteger('돈', true);
        const user = yield client.models.gambling.findOne({ id, guildId });
        if (money > user.money) {
            Utils_1.Utils.reply(interaction, client.messages.overMoney(user.money));
            return;
        }
        const random = Math.floor(Math.random() * 2);
        if (random == 1) {
            (yield client.models.gambling.updateOne({ id, guildId }, { $inc: { money: money } })).matchedCount;
            interaction.reply(client.messages.gambling.successGamb(user.money, money));
        }
        else if (random == 0) {
            (yield client.models.gambling.updateOne({ id, guildId }, { $inc: { money: -money } })).matchedCount;
            interaction.reply(client.messages.gambling.failureGamb(user.money, money));
        }
    }),
});
