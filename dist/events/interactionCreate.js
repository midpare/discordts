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
const Utils_1 = require("../structures/Utils");
exports.default = new Event_1.Event({
    name: 'interactionCreate',
    execute: (client, interaction) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        const { guildId, user: { id } } = interaction;
        if (!guildId)
            return;
        if (interaction.isChatInputCommand()) {
            const time = new Date().getTime();
            const { commandName, options } = interaction;
            const guild = yield client.models.guild.findOne({ id: guildId });
            const gambChannel = (_a = client.guilds.cache.get(guildId)) === null || _a === void 0 ? void 0 : _a.channels.cache.get(guild.gambling);
            const cmdChannel = (_b = client.guilds.cache.get(guildId)) === null || _b === void 0 ? void 0 : _b.channels.cache.get(guild.command);
            const event = client.commands.get(commandName);
            if (!event)
                return;
            switch (event.category) {
                case '도박':
                case '베팅':
                case '코인':
                    if (!gambChannel)
                        break;
                    if (interaction.channel != gambChannel) {
                        Utils_1.Utils.reply(interaction, '이 명령어는 도박방에서만 사용할 수 있습니다.');
                        return;
                    }
                    if (event.name == '가입')
                        break;
                    const user = yield client.models.gambling.findOne({ id, guildId });
                    if (event.name != '가입' && !user) {
                        Utils_1.Utils.reply(interaction, '가입되지 않은 유저입니다 !가입 을 통해 가입해주시기 바랍니다.');
                        return;
                    }
                    const leftTime = 1000 * 60 * 60 - time + user.bankruptcy;
                    const leftminute = Math.floor(leftTime / (1000 * 60));
                    const leftsecond = leftTime / 1000 - leftminute * 60;
                    if (leftTime > 0) {
                        Utils_1.Utils.reply(interaction, `파산한 유저는 한시간동안 도박을 할 수 없습니다.\n남은 시간: ${leftminute}분 ${Math.floor(leftsecond)}초`);
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
            try {
                event.execute({ interaction, options: options, client });
            }
            catch (error) {
                console.error(error);
            }
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
            try {
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
            catch (error) {
                console.error(error);
            }
        }
    }),
});
