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
const Event_1 = require("../managers/Event");
const Utils_1 = require("../structures/Utils");
exports.default = new Event_1.Event({
    name: 'interactionCreate',
    execute: (client, interaction) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c;
        const { guildId, user: { id } } = interaction;
        if (!guildId)
            return;
        const user = yield client.models.config.findOne({ id, guildId });
        if (user && !user.activity) {
            (yield client.models.config.updateOne({ id, guildId }, { $set: { activity: true } })).matchedCount;
        }
        if (interaction.isChatInputCommand()) {
            const time = new Date().getTime();
            const { commandName, options } = interaction;
            const guild = yield client.models.guild.findOne({ id: guildId });
            const gambChannel = (_a = interaction.guild) === null || _a === void 0 ? void 0 : _a.channels.cache.get(guild.gambling);
            const cmdChannel = (_b = interaction.guild) === null || _b === void 0 ? void 0 : _b.channels.cache.get(guild.command);
            const event = client.commands.get(commandName);
            if (!event)
                return;
            switch (event.category) {
                case '도박':
                case '베팅':
                case '코인':
                    if (event.name == '가입')
                        break;
                    const gambUser = yield client.models.gambling.findOne({ id, guildId });
                    if (event.name != '가입' && !gambUser) {
                        Utils_1.Utils.reply(interaction, '가입되지 않은 유저입니다 /가입 을 통해 가입해주시기 바랍니다.');
                        return;
                    }
                    const leftTime = 1000 * 60 * 60 - time + gambUser.bankruptcyTime;
                    const leftminute = Math.floor(leftTime / (1000 * 60));
                    const leftsecond = leftTime / 1000 - leftminute * 60;
                    if (leftTime > 0) {
                        Utils_1.Utils.reply(interaction, `파산한 유저는 한시간동안 도박을 할 수 없습니다.\n남은 시간: ${leftminute}분 ${Math.floor(leftsecond)}초`);
                        return;
                    }
                    if (!gambChannel)
                        break;
                    if (interaction.channel != gambChannel) {
                        Utils_1.Utils.reply(interaction, '이 명령어는 도박방에서만 사용할 수 있습니다.');
                        return;
                    }
                    break;
                case '기본':
                case '관리자':
                    break;
                default:
                    if (!cmdChannel)
                        break;
                    if (interaction.channel != cmdChannel) {
                        Utils_1.Utils.reply(interaction, '이 명령어는 명령어사용방에서만 사용할 수 있습니다.');
                        return;
                    }
                    break;
            }
            const result = yield event.execute({ interaction, options: options, client });
            if (result == 0)
                return;
            const logChannel = (_c = interaction.guild) === null || _c === void 0 ? void 0 : _c.channels.cache.get(guild.log.command);
            if (!logChannel)
                return;
            const member = interaction.member;
            const getOptions = (e) => {
                var _a, _b, _c;
                switch (e.name) {
                    case '돈':
                        return `${e.name}: ${e.value}원`;
                    case '수량' || '개수':
                        return `${e.name}: ${e.value}개`;
                }
                switch (e.type) {
                    case discord_js_1.ApplicationCommandOptionType.String:
                        return `${e.name}: "${e.value}"`;
                    case discord_js_1.ApplicationCommandOptionType.User:
                        return `${e.name}: ${(_a = e.user) === null || _a === void 0 ? void 0 : _a.username}`;
                    case discord_js_1.ApplicationCommandOptionType.Channel:
                        return `${e.name}: ${(_b = e.channel) === null || _b === void 0 ? void 0 : _b.name}`;
                    case discord_js_1.ApplicationCommandOptionType.Role:
                        return `${e.name}: ${(_c = e.role) === null || _c === void 0 ? void 0 : _c.name}`;
                }
                return `${e.name}: ${e.value}`;
            };
            logChannel.send(`${member.displayName}님이 ${commandName}(${options.data.map(getOptions)})를 사용했습니다.`);
        }
        else if (interaction.isButton() || interaction.isSelectMenu()) {
            const options = client.interactionOptions.get(interaction.customId);
            let event = client.interactions.get(interaction.customId);
            if (!options && event) {
                event.execute({ interaction, options, client });
                return;
            }
            if (!options) {
                interaction.reply({ content: '사용되지 않거나 종료된 상호작용입니다.', ephemeral: true });
                return;
            }
            event = client.interactions.get(options.cmd);
            if (!event || (!options.ids.includes(id) && options.guildId != guildId)) {
                interaction.reply({ content: '이 상호작용을 사용할 수 없습니다.', ephemeral: true });
                return;
            }
            event.execute({ interaction, options, client });
            for (const id of options.customIds) {
                client.interactionOptions.delete(id);
            }
            if (event.deleted) {
                for (const msg of options.messages) {
                    msg.delete();
                }
            }
        }
    }),
});
