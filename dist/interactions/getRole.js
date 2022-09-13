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
const Utils_1 = require("../structures/Utils");
exports.default = new Interaction_1.Interaction({
    name: 'getRole',
    deleted: false,
    execute: ({ interaction, client }) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c;
        const { guildId, member } = interaction;
        if (!member || !(member instanceof discord_js_1.GuildMember) || !guildId)
            return;
        const roles = member.roles;
        const guild = yield client.models.guild.findOne({ id: guildId });
        const { temporaryRole, baseRole } = guild;
        if (!((_a = interaction.guild) === null || _a === void 0 ? void 0 : _a.roles.cache.has(temporaryRole)) || !((_b = interaction.guild) === null || _b === void 0 ? void 0 : _b.roles.cache.has(baseRole))) {
            Utils_1.Utils.reply(interaction, '임시역할과 기본역할을 등록해주시기 바랍니다.');
            return;
        }
        roles.add(baseRole);
        roles.remove(temporaryRole);
        Utils_1.Utils.reply(interaction, '성공적으로 역할을 지급받았습니다!');
        const channel = (_c = client.guilds.cache.get(guildId)) === null || _c === void 0 ? void 0 : _c.channels.cache.get(guild.join);
        if (!channel)
            return;
        channel === null || channel === void 0 ? void 0 : channel.send(`${interaction.user.username}#${interaction.user.discriminator}님이 서버에 입장하였습니다.`);
    }),
});
