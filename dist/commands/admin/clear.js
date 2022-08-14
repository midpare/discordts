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
    name: 'clear',
    aliases: ['클리어'],
    category: '관리자',
    usage: 'clear <개수>',
    description: '메시지를 보낸 채팅방에 <숫자>만큼의 채팅을 지웁니다.',
    options: [
        {
            name: '개수',
            description: '지울 메시지의 개수를 입력합니다.',
            type: discord_js_1.ApplicationCommandOptionType.Integer,
            min_value: 1,
            max_value: 99,
            required: true,
        },
        {
            name: '유저',
            description: '어떤 유저의 메시지를 지울지 입력합니다.',
            type: discord_js_1.ApplicationCommandOptionType.User,
            required: false,
        },
    ],
    default_member_permissions: discord_js_1.PermissionFlagsBits.ManageMessages,
    execute: ({ interaction, options, client }) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const count = options.getInteger('개수', true);
        const target = options.getUser('유저');
        const channel = interaction.channel;
        if (!channel || !channel.isTextBased() || channel.isVoiceBased() || channel.isDMBased())
            return;
        let msgs = (yield channel.messages.fetch({ limit: 99 })).sort((interaction1, interaction2) => interaction2.createdTimestamp - interaction1.createdTimestamp);
        if (target) {
            msgs = msgs.filter(msg => msg.author.id == target.id);
        }
        const length = msgs.size - count;
        for (let i = 0; i < length; i++) {
            msgs.delete(msgs.keyAt(count));
        }
        if (msgs.size == 0)
            return;
        if (msgs.size == 1) {
            (_a = msgs.first()) === null || _a === void 0 ? void 0 : _a.delete();
            return;
        }
        channel.bulkDelete(msgs, true);
        Utils_1.Utils.reply(interaction, client.messages.admin.clear.success(count));
    }),
});
