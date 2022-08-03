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
const Commands_1 = require("../../../managers/Commands");
const Utils_1 = require("../../../structures/Utils");
exports.default = new Commands_1.Command({
    name: '망언 확인',
    aliases: ['망언 목록', '망언 리스트'],
    private: true,
    execute: ({ msg, client }) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const target = (_a = msg.mentions.members) === null || _a === void 0 ? void 0 : _a.first();
        if (!target) {
            Utils_1.Utils.reply(msg, client.messages.missingMentionUser('망언을 확인'));
            return;
        }
        const { id, guild: { id: guildId } } = target;
        const user = yield client.models.config.findOne({ id, guildId });
        if (user.slangs.length < 1) {
            Utils_1.Utils.reply(msg, '이 유저는 망언을 보유하고 있지 않습니다.');
            return;
        }
        for (let i = 0; i < user.slangs.length; i++) {
            user.slangs[i] = `${i + 1}. ${user.slangs[i]}`;
        }
        const embed = new discord_js_1.EmbedBuilder()
            .setTitle(`${user.name}님의 망언`)
            .setDescription(`${user.slangs.join('\n')}`);
        msg.channel.send({ embeds: [embed] });
        msg.delete();
    })
});
