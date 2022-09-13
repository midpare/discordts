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
    name: 'ready',
    execute: (client) => __awaiter(void 0, void 0, void 0, function* () {
        const guilds = Array.from(client.guilds.cache.values());
        for (const guild of guilds) {
            const guildId = guild.id;
            const guildInfo = yield client.models.guild.findOne({ id: guildId });
            if (!guildInfo) {
                const newGuild = new client.models.guild({ id: guildId });
                newGuild.save();
            }
            const members = Array.from(guild.members.cache.values());
            for (const member of members) {
                const { id, user: { username: name } } = member;
                const user = yield client.models.config.findOne({ id, guildId });
                if (member.user.bot)
                    continue;
                if (!user) {
                    const newUser = new client.models.config({ id, name, guildId });
                    newUser.save();
                }
                else if (user.name != member.displayName) {
                }
            }
        }
        console.log(`Successfully logged in to ${client.guilds.cache.size} servers!`);
    }),
});
