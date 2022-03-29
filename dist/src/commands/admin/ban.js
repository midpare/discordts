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
const Commands_1 = require("../../structures/Commands");
const message_1 = require("../../util/language/message");
const Client_1 = require("../../structures/Client");
exports.default = new Commands_1.Command({
    name: 'ban',
    aliases: ['밴', '벤', '차단'],
    category: '관리자',
    usage: 'ban <유저> [사유]',
    description: '서버에서 맨션한 <유저>를 차단합니다.',
    execute: ({ msg, args }) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        if (!msg.member.permissions.has('BAN_MEMBERS'))
            return msg.reply(message_1.messages.missingPermissionUser);
        const channel = Client_1.client.channels.cache.get('910521119877005363');
        const target = (_a = msg.mentions.members) === null || _a === void 0 ? void 0 : _a.first();
        const reason = !args[1] ? message_1.messages.none : args.slice(1).join(' ');
        if (!target)
            return msg.reply(message_1.messages.admin.ban.missingMentionUser);
        if (target.permissions.has('BAN_MEMBERS'))
            return msg.reply(message_1.messages.admin.ban.missingPermissionTarget);
        target.ban({ reason });
        channel.send(message_1.messages.admin.ban.success(target.user, reason));
        msg.delete();
    }),
});
