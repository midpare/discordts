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
exports.default = new Command_1.Command({
    name: '랭킹',
    aliases: ['순위'],
    category: '도박',
    description: '이 서버의 도박 순위를 확인합니다.',
    execute: ({ interaction, client }) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const users = yield client.models.gambling.find({ money: { $gt: 0 } }).sort({ money: -1 });
        const embed = new discord_js_1.EmbedBuilder()
            .setTitle('랭킹')
            .setDescription('유저의 돈 순위를 확인합니다.');
        for (const user of users) {
            embed.addFields({ name: user.name, value: `${user.money.toLocaleString()}원`, inline: false });
        }
        (_a = interaction.channel) === null || _a === void 0 ? void 0 : _a.send({ embeds: [embed] });
    }),
});
