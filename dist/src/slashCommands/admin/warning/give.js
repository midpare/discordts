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
const warning_1 = require("../../../models/warning");
const discord_js_1 = require("discord.js");
const SlashCommand_1 = require("../../../managers/SlashCommand");
const Utils_1 = require("../../../structures/Utils");
exports.default = new SlashCommand_1.SlashCommand({
    name: '경고부여',
    aliases: ['경고 주기'],
    category: '관리자',
    usage: '경고 부여 <유저> <횟수> [사유]',
    description: '유저에게 경고를 부여합니다.',
    options: [
        {
            name: '유저',
            description: '송금할 유저를 맨션합니다.',
            required: true,
            type: discord_js_1.ApplicationCommandOptionType.User,
        },
        {
            name: '횟수',
            description: '경고를 차감할 횟수를 입력합니다.',
            required: true,
            type: discord_js_1.ApplicationCommandOptionType.Integer,
            min_value: 1,
            max_value: 10,
        },
        {
            name: '사유',
            description: '사유를 입력합니다.',
            required: false,
            type: discord_js_1.ApplicationCommandOptionType.String,
        },
    ],
    defaultMemberPermissions: discord_js_1.PermissionFlagsBits.KickMembers + discord_js_1.PermissionFlagsBits.BanMembers,
    execute: ({ interaction, options, client }) => __awaiter(void 0, void 0, void 0, function* () {
        const target = options.getUser('유저', true);
        const count = options.getInteger('횟수', true);
        const channel = client.channels.cache.get('910521119713394738');
        const id = target.id;
        const name = target.username;
        const user = yield client.models.warning.findOne({ id });
        const reason = options.getString('사유');
        if (!user) {
            const newUser = new warning_1.warning({ id, name, warning: 0 });
            yield newUser.save();
        }
        (yield client.models.warning.updateOne({ id }, { $inc: { warning: count } }, { upsert: true })).matchedCount;
        channel.send(client.messages.admin.warning.give.success(target, count, user.warning + count, reason !== null && reason !== void 0 ? reason : ''));
        Utils_1.Utils.reply(interaction, '성공적으로 경고를 부여했습니다!');
    }),
});
