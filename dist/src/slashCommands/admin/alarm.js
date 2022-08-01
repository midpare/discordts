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
const discord_js_1 = require("discord.js");
const SlashCommand_1 = require("../../managers/SlashCommand");
const Utils_1 = require("../../structures/Utils");
exports.default = new SlashCommand_1.SlashCommand({
    name: '알람',
    category: '관리자',
    usage: '알람 <유저>',
    description: '헤드셋과 마이크를 모두 끈 유저를 여러번 이동시킵니다.',
    options: [
        {
            name: '유저',
            description: '알람을 할 유저를 입력합니다.',
            type: discord_js_1.ApplicationCommandOptionType.User,
            required: true,
        }
    ],
    execute: ({ interaction, options, client }) => __awaiter(void 0, void 0, void 0, function* () {
        const target = options.getMember('유저');
        const channel1 = client.channels.cache.get('910521120770359323');
        const channel2 = client.channels.cache.get('910521120770359324');
        if (!(target instanceof discord_js_1.GuildMember)) {
            Utils_1.Utils.reply(interaction, '정확한 유저를 입력해주시기 바랍니다.');
            return;
        }
        if (client.alarmMembers.get(target.id)) {
            Utils_1.Utils.reply(interaction, '이미 알람을 작동중인 유저입니다.');
            return;
        }
        if (target.user.bot) {
            Utils_1.Utils.reply(interaction, client.messages.admin.alarm.bot);
            return;
        }
        if (target.voice.channelId == null) {
            Utils_1.Utils.reply(interaction, client.messages.missingVoiceChannelUser);
            return;
        }
        if (!target.voice.selfDeaf) {
            Utils_1.Utils.reply(interaction, client.messages.admin.alarm.missingSelfDeaf);
            return;
        }
        const userChannel = target.voice.channel;
        yield target.voice.setChannel(channel1);
        client.alarmMembers.set(target.id, target);
        Utils_1.Utils.reply(interaction, '성공적으로 알람을 작동했습니다!');
        const previousInterval = setInterval(() => {
            if (target.voice.channelId == null || !target.voice.selfDeaf)
                return;
            target.voice.setChannel(channel1);
            target.voice.setChannel(channel2);
        }, 1000);
        setTimeout(() => {
            clearInterval(previousInterval);
            target.voice.setChannel(userChannel);
            client.alarmMembers.delete(target.id);
        }, 5000);
    }),
});
