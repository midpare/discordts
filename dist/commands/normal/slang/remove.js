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
const Command_1 = require("../../../managers/Command");
const Utils_1 = require("../../../structures/Utils");
exports.default = new Command_1.Command({
    name: '망언삭제',
    category: '기본',
    usage: '망언삭제 <유저> <망언>',
    description: '유저의 망언을 삭제합니다.',
    options: [
        {
            name: '유저',
            description: '망언을 삭제할 유저를 입력합니다.',
            type: discord_js_1.ApplicationCommandOptionType.User,
            required: true,
        },
        {
            name: '내용',
            description: '삭제할 망언의 내용을 입력합니다.',
            type: discord_js_1.ApplicationCommandOptionType.String,
            required: true
        },
    ],
    execute: ({ interaction, options, client }) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        const target = options.getUser('유저', true);
        const content = options.getString('내용', true);
        const { guildId } = interaction;
        const { id } = target;
        if (!guildId)
            return;
        const guild = yield client.models.guild.findOne({ id: guildId });
        const channel = (_a = client.guilds.cache.get(guildId)) === null || _a === void 0 ? void 0 : _a.channels.cache.get(guild.slang);
        if (!channel) {
            Utils_1.Utils.reply(interaction, '망언 채널을 등록해주시기 바랍니다.');
            return;
        }
        const user = yield client.models.config.findOne({ id, guildId });
        if (!user.slangs.includes(content)) {
            Utils_1.Utils.reply(interaction, '이 유저는 이 망언을 보유하고 있지 않습니다.');
            return;
        }
        const messages = yield channel.messages.fetch();
        for (const [_, message] of messages) {
            if (message.embeds.length < 1)
                continue;
            const id = (_b = message.embeds[0].data.title) === null || _b === void 0 ? void 0 : _b.split('(')[1].split(')')[0];
            if (id == target.id) {
                if (user.slangs.length == 1) {
                    message.delete();
                    break;
                }
                const index = user.slangs.indexOf(content);
                user.slangs.splice(index, 1);
                for (let i = 0; i < user.slangs.length; i++) {
                    user.slangs[i] = `${i + 1}. ${user.slangs[i]}`;
                }
                const embed = new discord_js_1.EmbedBuilder()
                    .setTitle(`${user.name}(${user.id})님의 망언`)
                    .setDescription(user.slangs.join('\n'));
                message.edit({ embeds: [embed] });
                break;
            }
        }
        (yield client.models.config.updateOne({ id, guildId }, { $pull: { slangs: content } })).matchedCount;
        Utils_1.Utils.reply(interaction, `성공적으로 망언을 삭제했습니다!\n망언 내용: ${content}`);
    }),
});