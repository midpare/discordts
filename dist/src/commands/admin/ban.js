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
const Commands_1 = require("../../managers/Commands");
const discord_js_1 = require("discord.js");
exports.default = new Commands_1.Command({
    name: 'ban',
    aliases: ['밴', '벤', '차단'],
    category: '관리자',
    usage: 'ban <유저> [사유]',
    description: '서버에서 맨션한 <유저>를 차단합니다.',
    execute: ({ msg, args, client }) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        if (!((_a = msg.member) === null || _a === void 0 ? void 0 : _a.permissions.has(discord_js_1.PermissionFlagsBits.BanMembers))) {
            msg.reply(client.messages.missingPermissionUser);
            return;
        }
        const channel = client.channels.cache.get('910521119877005363');
        const target = (_b = msg.mentions.members) === null || _b === void 0 ? void 0 : _b.first();
        const reason = !args[1] ? client.messages.none : args.slice(1).join(' ');
        if (!target) {
            msg.reply(client.messages.admin.ban.missingMentionUser);
            return;
        }
        if (target.permissions.has(discord_js_1.PermissionFlagsBits.BanMembers)) {
            msg.reply(client.messages.admin.ban.missingPermissionTarget);
            return;
        }
        target.ban({ reason });
        channel.send(client.messages.admin.ban.success(target.user, reason));
        msg.delete();
    }),
});
