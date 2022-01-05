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
const Commands_1 = require("../../../structures/Commands");
exports.default = new Commands_1.Command({
    name: 'ban',
    aliases: ['밴', '벤', '차단'],
    category: 'admin',
    usage: 'ban <유저> <사유>',
    description: '서버에서 맨션한 <유저>를 차단합니다.',
    execute: ({ msg, args }) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        if (!msg.member.permissions.has('BAN_MEMBERS'))
            return msg.reply('이 명령어를 사용할 권한이 없습니다.');
        const user = (_a = msg.mentions.members) === null || _a === void 0 ? void 0 : _a.first();
        const reason = !args[1] ? '없음' : args.slice(1).join(' ');
        if (!user)
            return msg.reply('차단할 사용자를 맨션해 주시기 바랍니다.');
        if (user.permissions.has('BAN_MEMBERS'))
            return msg.reply('이 사용자는 차단할 수 없습니다.');
        user.ban({ reason });
        msg.channel.send('```' + `처벌 대상: ${user.user.username}#${user.user.discriminator}\n가한 처벌: 차단\n처벌 사유: ${reason}` + '```');
        msg.delete();
    }),
});
