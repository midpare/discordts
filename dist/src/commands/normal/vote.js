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
const builders_1 = require("@discordjs/builders");
const discord_js_1 = require("discord.js");
const Commands_1 = require("../../managers/Commands");
const Utils_1 = require("../../structures/Utils");
exports.default = new Commands_1.Command({
    name: '투표',
    category: '기본',
    usage: '투표 [개수]',
    description: '[개수]만큼의 투표를 합니다.',
    execute: ({ msg, args, client }) => __awaiter(void 0, void 0, void 0, function* () {
        const customId = Utils_1.Utils.uuid();
        const row = new builders_1.ActionRowBuilder().addComponents(new discord_js_1.TextInputBuilder()
            .setLabel('some label')
            .setStyle(discord_js_1.TextInputStyle.Short)
            .setPlaceholder('some placeholder')
            .setCustomId('test customId'));
        const modal = new discord_js_1.ModalBuilder().setComponents(row);
    })
});
