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
    name: 'voiceStateUpdate',
    execute: (client, oldState, newState) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c, _d;
        const { id, guild: { id: guildId } } = newState;
        const user = yield client.models.config.findOne({ id, guildId });
        const guild = yield client.models.guild.findOne({ id: newState.guild.id });
        const logChannel = newState.guild.channels.cache.get(guild.log.voice);
        if (user && !user.activity) {
            (yield client.models.config.updateOne({ id, guildId }, { $set: { activity: true } })).matchedCount;
        }
        if (!logChannel)
            return;
        if (oldState.channelId == newState.channelId)
            return;
        if (!oldState.channelId && newState.channelId) {
            logChannel.send(`${(_a = newState.member) === null || _a === void 0 ? void 0 : _a.displayName}님이 ${(_b = newState.channel) === null || _b === void 0 ? void 0 : _b.name}채널에 입장했습니다.`);
        }
        else if (oldState.channelId && !newState.channelId) {
            logChannel.send(`${(_c = newState.member) === null || _c === void 0 ? void 0 : _c.displayName}님이 ${(_d = oldState.channel) === null || _d === void 0 ? void 0 : _d.name}채널에서 퇴장했습니다.`);
        }
    })
});
