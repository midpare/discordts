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
const Commands_1 = require("../../managers/Commands");
const gambling_1 = require("../../models/gambling");
const discord_js_1 = require("discord.js");
const message_1 = require("../../util/language/message");
const interactionUser = new Array();
exports.default = new Commands_1.Command({
    name: '파산',
    category: '도박',
    usage: '파산',
    description: '모든 돈과 빚을 0원으로 만들고 3일간 도박을 하지 못합니다.',
    execute: ({ msg, args, client }) => __awaiter(void 0, void 0, void 0, function* () {
        const id = msg.author.id;
        const user = yield gambling_1.gambling.findOne({ id });
        if (interactionUser.includes(id))
            return msg.delete();
        const date = new Date();
        const today = '' + date.getFullYear() + date.getMonth() + date.getDate();
        const row = new discord_js_1.MessageActionRow().addComponents(new discord_js_1.MessageButton()
            .setLabel(message_1.messages.yes)
            .setStyle('SUCCESS')
            .setCustomId('yes'), new discord_js_1.MessageButton()
            .setLabel(message_1.messages.no)
            .setStyle('DANGER')
            .setCustomId('no'));
        const message = yield msg.reply({ content: '정말 파산하시겠습니까? 돈과 빚이 모두 0원으로 돌아갑니다', components: [row] });
        interactionUser.push(id);
        const collector = msg.channel.createMessageComponentCollector({
            max: 1,
        });
        collector.on('collect', (interaction) => __awaiter(void 0, void 0, void 0, function* () {
            if (!interaction || interaction.user.id != msg.author.id)
                return;
            if (interaction.customId == 'yes') {
                (yield gambling_1.gambling.updateOne({ id }, { $set: { bankruptcy: parseFloat(today), money: 0, debt: 0, principalDebt: 0, stock: [] } })).matchedCount;
                msg.reply(`${user.name}님이 파산했습니다!`);
                message.delete();
            }
            else if (interaction.customId == 'no') {
                msg.delete();
                message.delete();
            }
            interactionUser.splice(interactionUser.findIndex((element) => element == id), 1);
        }));
    }),
});
