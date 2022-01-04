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
const commands_1 = require("../../../contexts/commands");
const function_1 = require("../../../handler/function");
exports.default = new commands_1.Command({
    name: '팀',
    aliases: ['팀'],
    category: 'game',
    usage: '팀 <이름> <이름> ...',
    description: '적은 <이름>만큼의 유저를 1팀과 2팀으로 나눕니다.',
    execute: ({ msg, args }) => __awaiter(void 0, void 0, void 0, function* () {
        const embed = new discord_js_1.MessageEmbed()
            .setTitle('팀');
        if (!args[0])
            return msg.reply('기입할 이름을 입력해주세요');
        const length = args.length;
        const team = (0, function_1.shuffle)(args);
        for (let i = 0; i < length; i++) {
            if (i < length / 2)
                embed.addField('1팀', `${team[i]}`, false);
            else
                embed.addField('2팀', `${team[i]}`, false);
        }
        msg.channel.send({ embeds: [embed] });
    }),
});
