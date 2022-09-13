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
    name: '역할받기',
    category: '관리자',
    usage: '역할받기',
    description: '역할을 받을 수 있는 버튼을 만듭니다.',
    default_member_permissions: discord_js_1.PermissionFlagsBits.Administrator,
    execute: ({ interaction, client }) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c;
        const { guildId: id } = interaction;
        const guild = yield client.models.guild.findOne({ id });
        const { temporaryRole, baseRole } = guild;
        if (!((_a = interaction.guild) === null || _a === void 0 ? void 0 : _a.roles.cache.has(temporaryRole)) || !((_b = interaction.guild) === null || _b === void 0 ? void 0 : _b.roles.cache.has(baseRole))) {
            Utils_1.Utils.reply(interaction, '임시역할과 기본역할을 등록해주시기 바랍니다.');
            return 0;
        }
        const row = new discord_js_1.ActionRowBuilder().addComponents(new discord_js_1.ButtonBuilder()
            .setCustomId('getRole')
            .setStyle(discord_js_1.ButtonStyle.Primary)
            .setLabel('역할 받기'));
        (_c = interaction.channel) === null || _c === void 0 ? void 0 : _c.send({ content: '이 버튼을 눌러 역할을 받으세요.', components: [row] });
        Utils_1.Utils.reply(interaction, '성공적으로 역할 받기 버튼을 생성했습니다!');
        return 1;
    }),
});
