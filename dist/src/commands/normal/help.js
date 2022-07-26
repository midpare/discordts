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
const Commands_1 = require("../../managers/Commands");
exports.default = new Commands_1.Command({
    name: 'help',
    aliases: ['도움말', '명령어'],
    category: '기본',
    usage: 'help [카테고리]',
    description: '봇의 명령어를 확인합니다.',
    execute: ({ msg, args, client }) => __awaiter(void 0, void 0, void 0, function* () {
        const embed = new discord_js_1.EmbedBuilder();
        const prefix = process.env.PREFIX;
        const directories = [...new Set(client.commands.map((command) => command.category).filter(category => category != undefined))];
        const categories = new Map();
        for (const category of directories) {
            const getCommands = new Set(client.commands
                .filter((commands) => commands.category == category && !commands.private)
                .map((command) => command.name));
            categories.set(category, [...getCommands]);
        }
        const commands = categories.get(args[0]);
        if (!commands) {
            embed
                .setTitle('명령어')
                .setDescription('명령어 카테고리를 확인합니다.');
            for (const category of directories) {
                embed
                    .addFields({ name: `${prefix}help ${category}`, value: `${category} 관련 명령어를 확인합니다.`, inline: false });
            }
            msg.channel.send({ embeds: [embed] });
        }
        else {
            embed
                .setTitle(`${args[0]} 명령어`)
                .setDescription(`${args[0]} 관련 명령어를 확인합니다.\n<>는 필수, []는 선택사항 입니다.`);
            for (const element of commands) {
                const command = client.commands.get(element);
                if (command && !command.private) {
                    const aliases = command.aliases ? `\n동의어: ${command.aliases}` : '';
                    embed
                        .addFields({ name: `${prefix}${command.usage}`, value: `${command.description}${aliases}`, inline: false });
                }
            }
            msg.channel.send({ embeds: [embed] });
        }
    }),
});
