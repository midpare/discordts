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
const Commands_1 = require("../../structures/Commands");
const message_1 = require("../../util/language/message");
exports.default = new Commands_1.Command({
    name: 'clear',
    aliases: ['클리어'],
    category: '관리자',
    usage: 'clear <숫자>',
    description: '메시지를 보낸 채팅방에 <숫자>만큼의 채팅을 지웁니다.',
    execute: ({ msg, args }) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        if (!((_a = msg.member) === null || _a === void 0 ? void 0 : _a.permissions.has('MANAGE_MESSAGES')))
            return msg.reply(message_1.messages.missingPermissionUser);
        const count = parseFloat(args[0]);
        if (!Number.isInteger(count))
            return msg.reply(message_1.messages.naturalNumber);
        if (count < 0 || count > 99)
            return msg.reply(message_1.messages.betweenNumber(1, 99));
        if (!(msg.channel instanceof discord_js_1.NewsChannel || msg.channel instanceof discord_js_1.TextChannel || msg.channel instanceof discord_js_1.ThreadChannel))
            return;
        msg.channel.bulkDelete(count + 1);
        const send = yield msg.reply(message_1.messages.admin.clear.success(count));
        setTimeout(() => {
            send.delete();
        }, 1500);
    }),
});
