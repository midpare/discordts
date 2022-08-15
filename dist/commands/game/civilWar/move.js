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
const Command_1 = require("../../../managers/Command");
const Utils_1 = require("../../../structures/Utils");
exports.default = new Command_1.Command({
    name: '내전이동',
    category: '게임',
    usage: '내전이동',
    description: '팀을 나눈 유저들을 내전방으로 이동시킵니다.',
    execute: ({ interaction, client }) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        const civilWar = client.civilWar;
        const { guildId } = interaction;
        if (civilWar.isEmpty()) {
            Utils_1.Utils.reply(interaction, '이동할 유저가 없습니다.');
            return;
        }
        if (!guildId)
            return;
        const guild = yield client.models.guild.findOne({ id: guildId });
        if (guild.civilWar.length < 2) {
            Utils_1.Utils.reply(interaction, '내전채널을 등록해주시기 바랍니다.');
            return;
        }
        const channel1 = (_a = client.guilds.cache.get(guildId)) === null || _a === void 0 ? void 0 : _a.channels.cache.get(guild.civilWar[0]);
        const channel2 = (_b = client.guilds.cache.get(guildId)) === null || _b === void 0 ? void 0 : _b.channels.cache.get(guild.civilWar[1]);
        if (!channel1 || !channel2) {
            Utils_1.Utils.reply(interaction, '내전채널을 등록해주시기 바랍니다.');
            return;
        }
        for (const user of civilWar.teams[0]) {
            if (!user.voice || user.voice.channelId == null)
                continue;
            user.voice.setChannel(channel1);
        }
        for (const user of civilWar.teams[1]) {
            if (!user.voice || user.voice.channelId == null)
                continue;
            user.voice.setChannel(channel2);
        }
        interaction.reply('성공적으로 유저들을 이동했습니다!');
    }),
});
