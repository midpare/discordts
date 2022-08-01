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
exports.default = new Commands_1.Command({
    name: '알람',
    category: '관리자',
    usage: '알람 <유저>',
    description: '헤드셋과 마이크를 모두 끈 유저를 여러번 이동시킵니다.',
    execute: ({ msg, client }) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const target = (_a = msg.mentions.members) === null || _a === void 0 ? void 0 : _a.first();
        const channel1 = client.channels.cache.get('910521120770359323');
        const channel2 = client.channels.cache.get('910521120770359324');
        if (!target) {
            msg.reply(client.messages.admin.alarm.missingMentionUser);
            return;
        }
        if (target.user.bot) {
            msg.reply(client.messages.admin.alarm.bot);
            return;
        }
        if (target.voice.channelId == null) {
            msg.reply(client.messages.missingVoiceChannelUser);
            return;
        }
        if (!target.voice.selfDeaf) {
            msg.reply(client.messages.admin.alarm.missingSelfDeaf);
            return;
        }
        const userChannel = target.voice.channel;
        yield target.voice.setChannel(channel1);
        const previousInterval = setInterval(() => {
            if (target.voice.channelId == null || !target.voice.selfDeaf)
                return;
            target.voice.setChannel(channel1);
            target.voice.setChannel(channel2);
        }, 1000);
        setTimeout(() => {
            clearInterval(previousInterval);
            target.voice.setChannel(userChannel);
        }, 5000);
    }),
});