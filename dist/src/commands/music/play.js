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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_player_1 = require("discord-player");
const Player_1 = __importDefault(require("../../structures/Player"));
const Commands_1 = require("../../structures/Commands");
const findBot_1 = require("../../util/functions/findBot");
exports.default = new Commands_1.Command({
    name: 'play',
    aliases: ['p'],
    category: '노래',
    usage: 'play <제목>',
    description: '제목의 노래를 현재 음성채널에서 재생합니다.',
    execute: ({ msg, args }) => __awaiter(void 0, void 0, void 0, function* () {
        const channel = msg.member.voice.channel;
        if (!channel)
            return msg.reply('채널에 접속해주시기 바랍니다.');
        if (!args[0])
            return msg.reply('노래 제목을 입력해주시기 바랍니다.');
        const songTitle = args.join(' ');
        const searchResult = yield Player_1.default.search(songTitle, {
            requestedBy: msg.author,
            searchEngine: discord_player_1.QueryType.YOUTUBE_SEARCH,
        });
        const members = Array.from(channel.members.values());
        const queue = Player_1.default.createQueue(msg.guild, { metadata: msg.channel });
        if (!(0, findBot_1.findBot)(members)) {
            yield queue.connect(channel);
        }
        queue.addTrack(searchResult.tracks[0]);
        if (!queue.playing) {
            yield queue.play();
            msg.reply(`${searchResult.tracks[0]}을(를) ${channel.name}에서 재생합니다!`);
        }
        else {
            msg.reply(`${searchResult.tracks[0]}을(를) 리스트에 추가합니다!`);
        }
    }),
});
