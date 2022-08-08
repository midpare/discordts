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
const SlashCommand_1 = require("../../../managers/SlashCommand");
const Utils_1 = require("../../../structures/Utils");
exports.default = new SlashCommand_1.SlashCommand({
    name: '망언추가',
    category: '기본',
    usage: '망언추가 <유저> <망언>',
    description: '유저의 망언을 추가합니다.',
    options: [
        {
            name: '유저',
            description: '망언을 추가할 유저를 맨션합니다.',
            type: discord_js_1.ApplicationCommandOptionType.User,
            required: true,
        },
        {
            name: '내용',
            description: '추가할 내용을 입력합니다.',
            type: discord_js_1.ApplicationCommandOptionType.String,
            required: true,
        }
    ],
    execute: ({ interaction, options, client }) => __awaiter(void 0, void 0, void 0, function* () {
        const target = options.getUser('유저', true);
        const content = options.getString('내용', true);
        const { guildId } = interaction;
        const { id } = target;
        const user = yield client.models.config.findOne({ id, guildId });
        if (user.slangs.includes(content)) {
            Utils_1.Utils.reply(interaction, '이 망언은 이미 추가되어있습니다.');
            return;
        }
        (yield client.models.config.updateOne({ id, guildId }, { $push: { slangs: content } })).matchedCount;
        Utils_1.Utils.reply(interaction, `성공적으로 망언을 추가했습니다!\n망언 내용: ${content}`);
    })
});
