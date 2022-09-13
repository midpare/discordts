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
    name: '베팅종료',
    category: '베팅',
    usage: '베팅종료 <팀>',
    description: '베팅을 종료합니다.',
    options: [
        {
            name: '팀',
            description: '승리한 팀을 입력합니다.',
            type: discord_js_1.ApplicationCommandOptionType.String,
            required: true
        }
    ],
    execute: ({ interaction, options, client }) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const guildId = (_a = interaction.guildId) !== null && _a !== void 0 ? _a : '';
        const betting = client.betting.get(guildId);
        if (!betting) {
            Utils_1.Utils.reply(interaction, '아직 베팅을 시작하지 않았습니다.');
            return 0;
        }
        if (betting.starter != interaction.user.id) {
            Utils_1.Utils.reply(interaction, '베팅을 종료할 권한이 없습니다.');
            return 0;
        }
        const bet1 = betting.bet1;
        const bet2 = betting.bet2;
        const winner = options.getString('팀', true);
        let times = 0;
        switch (winner) {
            case bet1.name:
                betting.end('bet1');
                times = betting.times.bet1;
                break;
            case bet2.name:
                betting.end('bet2');
                times = betting.times.bet2;
                break;
            default:
                Utils_1.Utils.reply(interaction, `${bet1.name}과 ${bet2.name}중 승리팀을 선택해주시기 바랍니다.`);
                return 0;
        }
        interaction.reply(`${winner}팀이 승리했습니다!\n배율: ${times}`);
        client.betting.delete(guildId);
        return 1;
    }),
});
