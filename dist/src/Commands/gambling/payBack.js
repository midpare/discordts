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
    name: '빚갚기',
    aliases: ['돈갚기'],
    category: '도박',
    usage: '빚갚기 <돈>',
    description: '자신의 빚을 갚습니다.',
    options: [
        {
            name: '돈',
            description: '갚을 돈을 입력합니다.',
            type: discord_js_1.ApplicationCommandOptionType.Integer,
            required: true,
            min_value: 1,
        },
    ],
    execute: ({ interaction, options, client }) => __awaiter(void 0, void 0, void 0, function* () {
        const { guildId, user: { id } } = interaction;
        const user = yield client.models.gambling.findOne({ id, guildId });
        const money = options.getInteger('돈', true);
        if (user.money < money) {
            Utils_1.Utils.reply(interaction, client.messages.overMoney(user.money));
            return;
        }
        if (user.debt < money) {
            Utils_1.Utils.reply(interaction, client.messages.gambling.payBack.overMoney(user.debt));
            return;
        }
        (yield client.models.gambling.updateOne({ id, guildId }, { $inc: { money: -money, debt: -money } })).matchedCount;
        interaction.reply(client.messages.gambling.payBack.success(user.debt, money));
    }),
});
