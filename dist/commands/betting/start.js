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
const Betting_1 = require("../../structures/games/Betting");
const discord_js_1 = require("discord.js");
const Command_1 = require("../../managers/Command");
const Utils_1 = require("../../structures/Utils");
exports.default = new Command_1.Command({
    name: '베팅시작',
    aliases: ['베팅스타트'],
    category: '베팅',
    usage: '베팅시작 <제목> <팀1> <팀2>',
    description: '베팅을 시작합니다.',
    options: [
        {
            name: '제목',
            description: '베팅의 제목을 입력합니다.',
            type: discord_js_1.ApplicationCommandOptionType.String,
            required: true,
        },
        {
            name: '팀1',
            description: '첫번째 팀의 이름을 입력합니다.',
            type: discord_js_1.ApplicationCommandOptionType.String,
            required: true
        },
        {
            name: '팀2',
            description: '두번째 팀의 이름을 입력합니다.',
            type: discord_js_1.ApplicationCommandOptionType.String,
            required: true,
        },
    ],
    execute: ({ interaction, options, client }) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const starter = interaction.user.id;
        const guildId = (_a = interaction.guildId) !== null && _a !== void 0 ? _a : '';
        if (client.betting.get(guildId)) {
            Utils_1.Utils.reply(interaction, '이미 시작한 베팅이 있습니다.');
            return 0;
        }
        const title = options.getString('제목', true);
        const team1 = options.getString('팀1', true);
        const team2 = options.getString('팀2', true);
        const embed = new discord_js_1.EmbedBuilder();
        const betting = new Betting_1.Betting(starter, title, team1, team2, client);
        embed
            .setTitle(betting.title)
            .setDescription(`${betting.bet1.name}와 ${betting.bet2.name}중 베팅해주시기바랍니다.`)
            .addFields({ name: `${betting.bet1.name}`, value: `/베팅 ${betting.bet1.name} 로 베팅해주시기바랍니다.`, inline: true }, { name: `${betting.bet2.name}`, value: `/베팅 ${betting.bet2.name} 로 베팅해주시기바랍니다.`, inline: true });
        interaction.reply({ embeds: [embed] });
        client.betting.set(guildId, betting);
        return 1;
    }),
});
