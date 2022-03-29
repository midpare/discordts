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
const Client_1 = require("../../structures/Client");
const Commands_1 = require("../../structures/Commands");
const message_1 = require("../../util/language/message");
exports.default = new Commands_1.Command({
    name: '알람',
    category: '관리자',
    usage: '알람 <유저>',
    description: '헤드셋과 마이크를 모두 끈 유저를 여러번 이동시킵니다.',
    execute: ({ msg, args }) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const target = (_a = msg.mentions.members) === null || _a === void 0 ? void 0 : _a.first();
        const nextChannel = Client_1.client.channels.cache.get('910521120770359323');
        if (!target)
            return msg.reply(message_1.messages.admin.alarm.missingMentionUser);
        if (target.user.bot)
            return msg.reply(message_1.messages.admin.alarm.bot);
        if (target.voice.channelId == null)
            return msg.reply(message_1.messages.missingVoiceChannelUser);
        if (!target.voice.selfDeaf)
            return msg.reply(message_1.messages.admin.alarm.missingSelfDeaf);
        const previousChannel = target.voice.channel;
        yield target.voice.setChannel(nextChannel);
        const previousInterval = setInterval(() => {
            if (target.voice.channelId == null)
                return;
            target.voice.setChannel(previousChannel);
            target.voice.setChannel(nextChannel);
        }, 1000);
        setTimeout(() => {
            clearInterval(previousInterval);
            target.voice.setChannel(previousChannel);
        }, 5000);
    }),
});
