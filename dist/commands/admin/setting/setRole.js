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
const Command_1 = require("../../../managers/Command");
const Utils_1 = require("../../../structures/Utils");
exports.default = new Command_1.Command({
    name: '역할등록',
    category: '관리자',
    usage: '역할등록 <역할유형> <역할>',
    description: '서버에서 사용되는 여러 역할을 등록합니다.',
    options: [
        {
            name: '역할유형',
            description: '등록할 역할의 유형을 입력합니다.',
            type: discord_js_1.ApplicationCommandOptionType.String,
            required: true,
            choices: [
                {
                    name: '임시역할',
                    value: 'temporaryRole',
                },
                {
                    name: '기본역할',
                    value: 'baseRole',
                },
            ],
        },
        {
            name: '역할',
            description: '역할을 입력합니다.',
            type: discord_js_1.ApplicationCommandOptionType.Role,
            required: true,
        },
    ],
    default_member_permissions: discord_js_1.PermissionFlagsBits.Administrator,
    execute: ({ interaction, options, client }) => __awaiter(void 0, void 0, void 0, function* () {
        const { guildId: id } = interaction;
        const type = options.getString('역할유형', true);
        const role = options.getRole('역할', true);
        (yield client.models.guild.updateOne({ id }, { $set: { [type]: role } })).matchedCount;
        Utils_1.Utils.reply(interaction, '성공적으로 역할을 등록했습니다!');
    }),
});
