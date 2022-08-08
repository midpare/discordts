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
const SlashCommand_1 = require("../../managers/SlashCommand");
exports.default = new SlashCommand_1.SlashCommand({
    name: 'help',
    aliases: ['도움말', '명령어'],
    category: '기본',
    usage: 'help [카테고리]',
    description: '봇의 명령어를 확인합니다.',
    options: [
        {
            name: '카테고리',
            description: '명령어 카테고리를 입력합니다.',
            type: discord_js_1.ApplicationCommandOptionType.String,
            required: false,
        }
    ],
    execute: ({ interaction, options, client }) => __awaiter(void 0, void 0, void 0, function* () {
        const embed = new discord_js_1.EmbedBuilder();
        const directories = [...new Set(client.slashCommands.map(command => command.category).filter(category => category != undefined))];
        const categories = new Map();
        for (const category of directories) {
            const getCommands = new Set(client.slashCommands
                .filter(commands => commands.category == category)
                .map(command => command.name));
            categories.set(category, [...getCommands]);
        }
        const category = options.getString('카테고리');
        const commands = categories.get(category);
        if (!commands) {
            embed
                .setTitle('명령어')
                .setDescription('명령어 카테고리를 확인합니다.');
            for (const category of directories) {
                embed
                    .addFields({ name: `/help ${category}`, value: `${category} 관련 명령어를 확인합니다.`, inline: false });
            }
            interaction.reply({ embeds: [embed] });
        }
        else {
            embed
                .setTitle(`${category} 명령어`)
                .setDescription(`${category} 관련 명령어를 확인합니다.\n<>는 필수, []는 선택사항 입니다.`);
            for (const element of commands) {
                const command = client.slashCommands.get(element);
                if (command) {
                    embed
                        .addFields({ name: '/' + command.usage, value: command.description, inline: false });
                }
            }
            interaction.reply({ embeds: [embed] });
        }
    }),
});
