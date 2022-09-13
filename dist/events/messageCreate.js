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
    execute: (client, msg) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        if (!msg.guildId || msg.author.bot)
            return;
        const { guildId, author: { id } } = msg;
        const user = yield client.models.config.findOne({ id, guildId });
        if (user && !user.activity) {
            (yield client.models.config.updateOne({ id, guildId }, { $set: { activity: true } })).matchedCount;
        }
        const guild = yield client.models.guild.findOne({ id: guildId });
        const logChannel = (_a = msg.guild) === null || _a === void 0 ? void 0 : _a.channels.cache.get(guild.log.message);
        const msgChannel = msg.channel;
        if (!logChannel)
            return;
        logChannel.send(`-${msgChannel.name}-\n${(_b = msg.member) === null || _b === void 0 ? void 0 : _b.displayName}: "${msg.content}"`);
    }),
});
