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
const Client_1 = require("../structures/Client");
const gambling_1 = require("../models/gambling");
const Event_1 = require("../managers/Event");
exports.default = new Event_1.Event({
    name: 'messageCreate',
    execute: (msg) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const client = msg.client;
        if (!(client instanceof Client_1.ExtendClient))
            return;
        const prefix = process.env.PREFIX || '';
        if (msg.author.bot || msg.author.id === ((_a = client.user) === null || _a === void 0 ? void 0 : _a.id) || !msg.content.startsWith(prefix))
            return;
        const id = msg.author.id;
        const args = msg.content.slice(prefix.length).trim().split(/ +/g);
        const getCmd = (start, end) => {
            return client.commands.get(args.slice(start, end).join(' ').toLowerCase());
        };
        let command;
        if (getCmd(0, 2)) {
            command = getCmd(0, 2);
            args.splice(0, 2);
        }
        else {
            command = getCmd(0, 1);
            args.splice(0, 1);
        }
        if (!command)
            return msg.reply(`정확한 명령어를 입력해주시기 바랍니다.\n${prefix}help`);
        const gambChannel1 = client.channels.cache.get('910521119877005367');
        const gambChannel2 = client.channels.cache.get('915212166330736691');
        const musicChannel = client.channels.cache.get('910521119877005366');
        const cmdChannel = client.channels.cache.get('932162287224127520');
        const botTestChannel = client.channels.cache.get('910521119877005368');
        if (msg.channel != botTestChannel) {
            switch (command.category) {
                case '도박':
                case '베팅':
                case '코인':
                    if (msg.channel != gambChannel1 && msg.channel != gambChannel2)
                        return msg.reply('이 명령어는 도박방에서만 사용할 수 있습니다.');
                    const user = yield gambling_1.gambling.findOne({ id });
                    if (command.name != '가입' && !user)
                        return msg.reply('가입되지 않은 유저입니다 !가입 을 통해 가입해주시기 바랍니다.');
                    break;
                case '노래':
                    if (msg.channel != musicChannel)
                        return msg.reply('이 명령어는 노래방에서만 사용할 수 있습니다.');
                    break;
                case '기본':
                case '관리자':
                    break;
                default:
                    if (msg.channel != cmdChannel)
                        return msg.reply('이 명령어는 명령어사용방에서만 사용할 수 있습니다.');
                    break;
            }
        }
        try {
            command.execute({ msg, args, client });
        }
        catch (error) {
            console.error(error);
        }
    }),
});
