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
    name: '이동',
    category: 'admin',
    usage: '이동 <유저/채널> <맨션> <채널>',
    description: '맨션한 유저나 맨션한 채널에 있는 유저를 다른 채널로 이동시킵니다.',
    execute: ({ msg, args }) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        if (!msg.member.permissions.has('MOVE_MEMBERS'))
            return msg.reply('당신은 이 명령어를 사용할 권한이 없습니다.');
        const channels = msg.mentions.channels.values();
        const users = new Array();
        switch (args[0]) {
            case '유저':
                const targetUser = ((_a = msg.mentions.members) === null || _a === void 0 ? void 0 : _a.values()) || [];
                const checkUser = (_b = msg.mentions.members) === null || _b === void 0 ? void 0 : _b.first();
                const userTargetChannel = channels.next().value;
                if (!checkUser)
                    return msg.reply('이동한 유저를 맨션해주시기바랍니다.');
                if (!userTargetChannel || !userTargetChannel.isVoice())
                    return msg.reply('정확한 음성채널을 맨션해주시기바랍니다.');
                for (const user of targetUser) {
                    if (user.voice.channelId == null)
                        continue;
                    user.voice.setChannel(userTargetChannel);
                    users.push(user.user.username);
                }
                users.length > 3 ? msg.reply(`성공적으로 ${users[0]}님 외 ${(users.length - 1).toLocaleString()}명이 ${userTargetChannel.name}채널로 이동했습니다!`) : msg.reply(`성공적으로 ${users.join(', ')}님이 ${userTargetChannel.name}채널로 이동했습니다!`);
                break;
            case '채널':
                const channelTargetChannel = channels.next().value;
                if (!channelTargetChannel || !channelTargetChannel.isVoice())
                    return msg.reply('음성채널을 맨션해주시기바랍니다.');
                const members = channelTargetChannel.members;
                if (!(members === null || members === void 0 ? void 0 : members.first()))
                    return msg.reply('이 채널에는 이동할 유저가 없습니다.');
                const movedChannel = channels.next().value;
                if (!movedChannel || !movedChannel.isVoice())
                    return msg.reply('이동할 정확한 채널을 선택해주시기바랍니다.');
                for (const user of members.values()) {
                    user.voice.setChannel(movedChannel);
                    users.push(user.user.username);
                }
                users.length > 3 ? msg.reply(`성공적으로 ${users[0]}님 외 ${(users.length - 1).toLocaleString()}명이 ${channelTargetChannel.name}채널로 이동했습니다!`) : msg.reply(`성공적으로 ${users.join(', ')}님이 ${channelTargetChannel.name}채널로 이동했습니다!`);
                break;
            default:
                return msg.reply('유저/채널 중 선택해주시기바랍니다.');
        }
    }),
});
