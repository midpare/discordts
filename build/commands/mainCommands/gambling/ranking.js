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
const gambling_1 = require("../../../models/gambling");
const commands_1 = require("../../../contexts/commands");
exports.default = new commands_1.Command({
    name: '랭킹',
    aliases: ['순위'],
    category: 'gambling',
    usage: '랭킹',
    description: '이 서버의 도박 순위를 확인합니다.',
    execute: ({ msg, args }) => __awaiter(void 0, void 0, void 0, function* () {
        const users = yield gambling_1.gambling.find({ money: { $gt: 0 } }).sort({ money: -1 });
        const embed = new discord_js_1.MessageEmbed()
            .setTitle('랭킹')
            .setDescription('유저의 돈 순위를 확인합니다.');
        users.forEach((element) => {
            embed.addField(element.name, `${element.money.toLocaleString()}원`, false);
        });
        msg.channel.send({ embeds: [embed] });
    }),
});
