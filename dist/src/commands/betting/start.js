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
const Betting_1 = require("../../structures/Betting");
const discord_js_1 = require("discord.js");
exports.default = new Commands_1.Command({
    name: '베팅 시작',
    aliases: ['베팅 스타트'],
    category: '베팅',
    usage: '베팅 시작 <제목> <팀1> <팀2>',
    description: '베팅을 시작합니다.',
    execute: ({ msg, args, client }) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        const id = (_a = msg.guildId) !== null && _a !== void 0 ? _a : '';
        const prefix = (_b = process.env.PREFIX) !== null && _b !== void 0 ? _b : '';
        if (client.betting.get(id))
            return msg.reply('이미 시작한 베팅이 있습니다.');
        if (!args[0])
            return msg.reply('제목을 입력해주시기바랍니다.');
        if (!args[1] || !args[2])
            return msg.reply('베팅 이름을 입력해주시기바랍니다.');
        const embed = new discord_js_1.MessageEmbed();
        const betting = new Betting_1.Betting(args[0], args[1], args[2], client);
        embed
            .setTitle(betting.title)
            .setDescription(`${betting.bet1.name}와 ${betting.bet2.name}중 베팅해주시기바랍니다.`)
            .addFields({ name: `${betting.bet1.name}`, value: `${prefix}베팅 ${betting.bet1.name} 로 베팅해주시기바랍니다.`, inline: true }, { name: `${betting.bet2.name}`, value: `${prefix}베팅 ${betting.bet2.name} 로 베팅해주시기바랍니다.`, inline: true });
        msg.channel.send({ embeds: [embed] });
        client.betting.set(id, betting);
    }),
});
