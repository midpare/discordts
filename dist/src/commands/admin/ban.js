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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const ms_1 = __importDefault(require("ms"));
const Command_1 = require("../../managers/Command");
const Utils_1 = require("../../structures/Utils");
exports.default = new Command_1.Command({
    name: '차단',
    aliases: ['ban', '밴', '벤'],
    category: '관리자',
    usage: '차단 <유저> [시간] [사유]',
    description: '서버에서 맨션한 <유저>를 차단합니다.',
    options: [
        {
            name: '유저',
            description: '차단할 유저를 입력합니다.',
            type: discord_js_1.ApplicationCommandOptionType.User,
            required: true,
        },
        {
            name: '시간',
            description: '차단할 시간을 입력합니다.',
            type: discord_js_1.ApplicationCommandOptionType.String,
            required: false,
        },
        {
            name: '사유',
            description: '사유를 입력합니다.',
            type: discord_js_1.ApplicationCommandOptionType.String,
            required: false,
        },
    ],
    default_member_permissions: discord_js_1.PermissionFlagsBits.BanMembers,
    execute: ({ interaction, options, client }) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        const channel = client.channels.cache.get('1001317081175826482');
        const target = options.getMember('유저');
        const time = options.getString('시간');
        const reason = (_a = options.getString('사유')) !== null && _a !== void 0 ? _a : '없음';
        if (!(target instanceof discord_js_1.GuildMember)) {
            Utils_1.Utils.reply(interaction, '정확한 유저를 입력해주시기 바랍니다.');
            return;
        }
        if (time && (0, ms_1.default)(time)) {
            const { id, guild: { id: guildId } } = target;
            client.models.config.updateOne({ id, guildId }, { $set: { banTime: (0, ms_1.default)(time) } });
        }
        if (target.permissions.has(discord_js_1.PermissionFlagsBits.BanMembers)) {
            Utils_1.Utils.reply(interaction, client.messages.admin.ban.missingPermissionTarget);
            return;
        }
        (_b = interaction.guild) === null || _b === void 0 ? void 0 : _b.members.ban(target, { reason });
        channel.send(client.messages.admin.ban.success(target.user, reason));
        Utils_1.Utils.reply(interaction, `성공적으로 ${target.user.username}님을 차단했습니다! `);
    }),
});
