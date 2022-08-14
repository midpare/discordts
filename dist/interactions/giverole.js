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
const Interaction_1 = require("../managers/Interaction");
const discord_js_1 = require("discord.js");
exports.default = new Interaction_1.Interaction({
    name: 'giveRole',
    deleted: false,
    execute: ({ interaction, client }) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        const { guildId, member } = interaction;
        if (!member || !(member instanceof discord_js_1.GuildMember) || !guildId)
            return;
        const roles = member.roles;
        const guild = yield client.models.guild.findOne({ id: guildId });
        const temporaryRole = guild.temporaryRole;
        const baseRole = guild.baseRole;
        if (member.guild.roles.cache.has(temporaryRole) || member.guild.roles.cache.has(baseRole))
            return;
        roles.add(baseRole);
        roles.remove(temporaryRole);
        (_a = interaction.channel) === null || _a === void 0 ? void 0 : _a.send('성공적으로 역할을 지급받았습니다!').then((msg) => {
            setTimeout(() => msg.delete(), 2000);
        });
        const channel = (_b = client.guilds.cache.get(guildId)) === null || _b === void 0 ? void 0 : _b.channels.cache.get(guild.join);
        if (!channel)
            return;
        channel === null || channel === void 0 ? void 0 : channel.send(`${interaction.user.username}#${interaction.user.discriminator}님이 서버에 입장하였습니다!`);
    }),
});
