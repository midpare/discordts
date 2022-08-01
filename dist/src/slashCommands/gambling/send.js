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
const SlashCommand_1 = require("../../managers/SlashCommand");
const Utils_1 = require("../../structures/Utils");
exports.default = new SlashCommand_1.SlashCommand({
    name: '송금',
    aliases: ['이체', '돈보내기'],
    category: '도박',
    usage: '송금 <유저> <돈>',
    description: '자신의 돈을 맨션한 <유저>에게 <돈>만큼 송금합니다.',
    options: [
        {
            name: '유저',
            description: '송금할 유저를 맨션합니다.',
            type: discord_js_1.ApplicationCommandOptionType.User,
            required: true,
        },
        {
            name: '돈',
            description: '송금할 돈을 입력합니다.',
            type: discord_js_1.ApplicationCommandOptionType.Integer,
            required: true,
            min_value: 1,
        }
    ],
    execute: ({ interaction, options, client }) => __awaiter(void 0, void 0, void 0, function* () {
        const { guildId, user: { id } } = interaction;
        const user = yield client.models.gambling.findOne({ id, guildId });
        const target = options.getMember('유저');
        if (!(target instanceof discord_js_1.GuildMember)) {
            Utils_1.Utils.reply(interaction, '정확한 유저를 입력해주시기 바랍니다.');
            return;
        }
        const targetUser = yield client.models.gambling.findOne({ id: target.id, guildId: target.guild.id });
        if (!targetUser) {
            Utils_1.Utils.reply(interaction, '송금할 유저가 가입을 하지 않았습니다.');
            return;
        }
        const money = options.getInteger('돈', true);
        if (user.money < money) {
            Utils_1.Utils.reply(interaction, `현재 잔액보다 높은 돈은 입력하실 수 없습니다. \n현재 잔액: ${user.money.toLocaleString()}원`);
            return;
        }
        (yield client.models.gambling.updateOne({ id, guildId }, { $inc: { money: -money } })).matchedCount;
        (yield client.models.gambling.updateOne({ id: target.id, guildId: target.guild.id }, { $inc: { money: money } })).matchedCount;
        interaction.reply(`성공적으로 ${targetUser.name}님에게 ${money.toLocaleString()}원을 송금했습니다!`);
    }),
});
