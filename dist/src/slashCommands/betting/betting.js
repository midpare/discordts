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
const Utils_1 = require("../../structures/Utils");
exports.default = new SlashCommand_1.SlashCommand({
    name: '베팅',
    category: '베팅',
    usage: '베팅',
    description: '베팅을 합니다.',
    options: [
        {
            name: '이름',
            description: '베팅할 종목의 이름을 입력합니다.',
            type: discord_js_1.ApplicationCommandOptionType.String,
            required: true,
        },
        {
            name: '돈',
            description: '베팅할 돈을 입력합니다.',
            type: discord_js_1.ApplicationCommandOptionType.Integer,
            required: true,
            min_value: 1,
        },
    ],
    execute: ({ interaction, options, client }) => __awaiter(void 0, void 0, void 0, function* () {
        const { guildId } = interaction;
        const name = options.getString('이름', true);
        const money = options.getInteger('돈', true);
        if (!guildId)
            return;
        const betting = client.betting.get(guildId);
        if (!betting) {
            Utils_1.Utils.reply(interaction, '아직 베팅을 시작하지 않았습니다.');
            return;
        }
        switch (name) {
            case betting.bet1.name:
                betting.bet1.addUser(interaction, money);
                break;
            case betting.bet2.name:
                betting.bet2.addUser(interaction, money);
                break;
            default:
                Utils_1.Utils.reply(interaction, `${betting.bet1.name}과 ${betting.bet2.name}중 승리팀을 선택해주시기 바랍니다.`);
                return;
        }
    }),
});
