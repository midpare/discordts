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
const Event_1 = require("../managers/Event");
exports.default = new Event_1.Event({
    name: 'messageCreate',
    execute: (msg) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const client = msg.client;
        const prefix = process.env.PREFIX || '';
        if (msg.author.bot || msg.author.id === ((_a = client.user) === null || _a === void 0 ? void 0 : _a.id) || !msg.content.startsWith(prefix))
            return;
        const id = msg.author.id;
        const args = msg.content.slice(prefix.length).trim().split(/ +/g);
        const time = new Date().getTime();
        const getCmd = (start, end) => {
            return client.commands.get(args.slice(start, end).join(' ').toLowerCase());
        };
        let event;
        if (getCmd(0, 2)) {
            event = getCmd(0, 2);
            args.splice(0, 2);
        }
        else {
            event = getCmd(0, 1);
            args.splice(0, 1);
        }
        if (!event) {
            msg.reply(`정확한 명령어를 입력해주시기 바랍니다.\n${prefix}help`);
            return;
        }
        const gambChannel = client.channels.cache.get('1000969429158481980');
        const cmdChannel = client.channels.cache.get('1000969483462123591');
        const botTestChannel = client.channels.cache.get('910521119877005368');
        if (msg.channel != botTestChannel && !event.private) {
            switch (event.category) {
                case '도박':
                case '베팅':
                case '코인':
                    if (msg.channel != gambChannel) {
                        msg.reply('이 명령어는 도박방에서만 사용할 수 있습니다.');
                        return;
                    }
                    const user = yield client.models.gambling.findOne({ id });
                    if (event.name != '가입' && !user) {
                        msg.reply('가입되지 않은 유저입니다 !가입 을 통해 가입해주시기 바랍니다.');
                        return;
                    }
                    const leftTime = 1000 * 60 * 60 - time + user.bankruptcy;
                    const leftminute = Math.floor(leftTime / (1000 * 60));
                    const leftsecond = leftTime / 1000 - leftminute * 60;
                    if (leftTime > 0) {
                        msg.reply(`파산한 유저는 한시간동안 도박을 할 수 없습니다.\n남은 시간: ${leftminute}분 ${Math.floor(leftsecond)}초`);
                        return;
                    }
                    break;
                case '기본':
                case '관리자':
                    break;
                default:
                    if (msg.channel != cmdChannel) {
                        msg.reply('이 명령어는 명령어사용방에서만 사용할 수 있습니다.');
                        return;
                    }
                    break;
            }
        }
        try {
            event.execute({ msg, args, client });
        }
        catch (error) {
            console.error(error);
        }
    }),
});
