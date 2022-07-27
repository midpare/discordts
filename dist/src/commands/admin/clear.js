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
const Commands_1 = require("../../managers/Commands");
exports.default = new Commands_1.Command({
    name: 'clear',
    aliases: ['클리어'],
    category: '관리자',
    usage: 'clear <숫자>',
    description: '메시지를 보낸 채팅방에 <숫자>만큼의 채팅을 지웁니다.',
    execute: ({ msg, args, client }) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c;
        if (!((_a = msg.member) === null || _a === void 0 ? void 0 : _a.permissions.has(discord_js_1.PermissionFlagsBits.ManageMessages))) {
            msg.reply(client.messages.missingPermissionUser);
            return;
        }
        const count = parseFloat(args[0]);
        if (!Number.isInteger(count)) {
            msg.reply(client.messages.naturalNumber);
            return;
        }
        if (count < 0 || count > 99) {
            msg.reply(client.messages.betweenNumber(1, 99));
            return;
        }
        if (!msg.channel.isTextBased() || msg.channel.isVoiceBased() || msg.channel.isDMBased())
            return;
        const target = (_b = msg.mentions.members) === null || _b === void 0 ? void 0 : _b.first();
        let msgs = yield msg.channel.messages.fetch({ limit: 99 });
        if (target) {
            msgs = msgs.filter(msg => msg.author.id == target.user.id);
        }
        if (msgs.size > count) {
            for (let i = 0; i < msgs.size - count; i++) {
                const key = msgs.keyAt(i + count);
                if (key)
                    msgs.delete(key);
            }
        }
        if (msgs.size == 0)
            return;
        if (msgs.size == 1) {
            (_c = msgs.first()) === null || _c === void 0 ? void 0 : _c.delete();
            return;
        }
        msg.channel.bulkDelete(msgs, true);
        const sent = yield msg.channel.send(client.messages.admin.clear.success(count));
        setTimeout(() => {
            sent.delete();
        }, 1500);
    }),
});
