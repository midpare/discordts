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
    name: '강퇴',
    aliases: ['킥', 'kick'],
    category: '관리자',
    usage: '강퇴 <유저> [사유]',
    description: '서버에서 맨션한 <유저>를 강퇴합니다.',
    options: [
        {
            name: '유저',
            description: '강퇴할 유저를 입력합니다.',
            type: discord_js_1.ApplicationCommandOptionType.User,
            required: true,
        },
        {
            name: '사유',
            description: '사유를 입력합니다.',
            type: discord_js_1.ApplicationCommandOptionType.String,
            required: false,
        },
    ],
    default_member_permissions: discord_js_1.PermissionFlagsBits.KickMembers,
    execute: ({ interaction, options, client }) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        const { guildId } = interaction;
        if (!guildId)
            return 0;
        const guild = yield client.models.guild.findOne({ id: guildId });
        const channel = (_a = interaction.guild) === null || _a === void 0 ? void 0 : _a.channels.cache.get(guild.punishment);
        if (!channel) {
            Utils_1.Utils.reply(interaction, '처벌내역방을 등록해주시기 바랍니다.');
            return 0;
        }
        const target = options.getMember('유저');
        const reason = (_b = options.getString('사유')) !== null && _b !== void 0 ? _b : '';
        if (!(target instanceof discord_js_1.GuildMember)) {
            Utils_1.Utils.reply(interaction, client.messages.admin.kick.missingMentionUser);
            return 0;
        }
        if (target.permissions.has(discord_js_1.PermissionFlagsBits.KickMembers)) {
            interaction.reply(client.messages.admin.kick.missingPermissionTarget);
            return 0;
        }
        target.kick(reason);
        channel.send(client.messages.admin.kick.success(target.user, reason));
        Utils_1.Utils.reply(interaction, `성공적으로 ${target.displayName}님을 강퇴했습니다!`);
        return 1;
    }),
});
