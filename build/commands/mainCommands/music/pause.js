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
const player_1 = __importDefault(require("../../../contexts/player"));
const commands_1 = require("../../../contexts/commands");
exports.default = new commands_1.Command({
    name: 'pause',
    category: 'music',
    usage: 'pause',
    description: '노래를 멈춥니다.',
    execute: ({ msg, args }) => __awaiter(void 0, void 0, void 0, function* () {
        if (!msg.member.voice.channel)
            return msg.reply('채널에 접속해주시기 바랍니다.');
        const queue = player_1.default.getQueue(msg.guildId);
        if (!queue)
            return msg.reply('노래가 재생되고 있지 않습니다.');
        queue.setPaused(true);
        msg.reply('노래를 정지합니다.');
    }),
});
