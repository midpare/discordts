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
    name: '경고부여',
    aliases: ['주기'],
    category: '관리자',
    usage: '경고부여 <유저> <횟수> [사유]',
    description: '유저에게 경고를 부여합니다.',
    options: [
        {
            name: '유저',
            description: '경고를 부여할 유저를 입력합니다.',
            type: discord_js_1.ApplicationCommandOptionType.User,
            required: true,
        },
        {
            name: '횟수',
            description: '경고를 차감할 횟수를 입력합니다.',
            type: discord_js_1.ApplicationCommandOptionType.Integer,
            required: true,
            min_value: 1,
            max_value: 10,
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
        var _a;
        const { guildId } = interaction;
        if (!guildId)
            return;
        const guild = yield client.models.guild.findOne({ id: guildId });
        const punishment = guild.punishment;
        if (punishment == '0') {
            Utils_1.Utils.reply(interaction, '처벌내역방을 등록해주시기 바랍니다.');
            return;
        }
        const channel = (_a = client.guilds.cache.get(guildId)) === null || _a === void 0 ? void 0 : _a.channels.cache.get(punishment);
        const target = options.getUser('유저', true);
        const count = options.getInteger('횟수', true);
        const { id } = target;
        const user = yield client.models.config.findOne({ id, guildId });
        const reason = options.getString('사유');
        channel.send(client.messages.admin.warning.give.success(target, count, user.warning + count, reason !== null && reason !== void 0 ? reason : ''));
        (yield client.models.config.updateOne({ id, guildId }, { $inc: { warning: count } }, { upsert: true })).matchedCount;
        Utils_1.Utils.reply(interaction, '성공적으로 경고를 부여했습니다!');
    }),
});
