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
const Utils_1 = require("../../../structures/Utils");
const Command_1 = require("../../../managers/Command");
exports.default = new Command_1.Command({
    name: '채널등록',
    category: '관리자',
    usage: '채널등록 <채널유형> <채널>, [채널]',
    description: '서버에서 사용되는 여러 채널을 등록합니다.',
    options: [
        {
            name: '채널유형',
            description: '등록할 채널의 유형을 입력합니다.',
            type: discord_js_1.ApplicationCommandOptionType.String,
            required: true,
            choices: [
                {
                    name: '처벌내역',
                    value: 'punishment',
                },
                {
                    name: '도박',
                    value: 'gambling',
                },
                {
                    name: '명령어',
                    value: 'command',
                },
                {
                    name: '망언',
                    value: 'slang',
                },
                {
                    name: '가입',
                    value: 'join',
                },
                {
                    name: '알람',
                    value: 'alarm',
                },
                {
                    name: '내전',
                    value: 'civilWar',
                },
            ],
        },
        {
            name: '채널1',
            description: '첫번째 채널을 입력합니다.',
            type: discord_js_1.ApplicationCommandOptionType.Channel,
            required: true,
        },
        {
            name: '채널2',
            description: '두번째 채널을 입력합니다.',
            type: discord_js_1.ApplicationCommandOptionType.Channel,
            required: false,
        },
    ],
    default_member_permissions: discord_js_1.PermissionFlagsBits.Administrator,
    execute: ({ interaction, options, client }) => __awaiter(void 0, void 0, void 0, function* () {
        const { guildId: id } = interaction;
        const type = options.getString('채널유형', true);
        const channel1 = options.getChannel('채널1', true);
        switch (type) {
            case 'alarm':
            case 'civilWar':
                const channel2 = options.getChannel('채널2');
                if (!(channel1 instanceof discord_js_1.BaseGuildVoiceChannel) || !(channel2 instanceof discord_js_1.BaseGuildVoiceChannel)) {
                    Utils_1.Utils.reply(interaction, '정확한 음성채널 두개를 입력해주시기 바랍니다.');
                    return;
                }
                (yield client.models.guild.updateOne({ id }, { $set: { [type]: [channel1.id, channel2.id] } })).matchedCount;
                break;
            default:
                if (!(channel1 instanceof discord_js_1.BaseGuildTextChannel)) {
                    Utils_1.Utils.reply(interaction, '정확한 채팅채널을 입력해주시기 바랍니다');
                    return;
                }
                (yield client.models.guild.updateOne({ id }, { $set: { [type]: channel1.id } })).matchedCount;
                break;
        }
        Utils_1.Utils.reply(interaction, '성공적으로 채널을 등록했습니다!');
    }),
});
