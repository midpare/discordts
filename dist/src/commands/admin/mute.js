"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Commands_1 = require("../../managers/Commands");
const ms_1 = __importDefault(require("ms"));
exports.default = new Commands_1.Command({
    name: 'mute',
    aliases: ['뮤트', '채팅 차단'],
    category: '관리자',
    usage: 'mute <유저> <시간> [사유]',
    description: '<유저>의 채팅을 <시간>만큼 차단합니다.',
    execute: ({ msg, args, client }) => {
        var _a, _b, _c;
        if ((_a = msg.member) === null || _a === void 0 ? void 0 : _a.permissions.has("MANAGE_CHANNELS"))
            return msg.reply('이 명령어를 사용할 권한이 없습니다.');
        const channel = client.channels.cache.get('910521119877005363');
        const target = (_b = msg.mentions.members) === null || _b === void 0 ? void 0 : _b.first();
        const mute = (_c = msg.guild) === null || _c === void 0 ? void 0 : _c.roles.cache.get('959778424505892875');
        if (!target)
            return msg.reply('채팅을 차단할 유저를 맨션해주시기 바랍니다.');
        const roles = target.roles;
        const targetRole = roles.cache.first();
        if (!args[1] || !(0, ms_1.default)(args[1]))
            return msg.reply('정확한 시간을 입력해주시기 바랍니다.\n예) 10h: 10시간, 50m: 50분');
    },
});
