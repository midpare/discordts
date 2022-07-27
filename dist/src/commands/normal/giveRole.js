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
const discord_js_1 = require("discord.js");
exports.default = new Commands_1.Command({
    name: 'giverole',
    private: true,
    execute: ({ msg, client }) => __awaiter(void 0, void 0, void 0, function* () {
        if (msg.author.id != '446068726849208341')
            return;
        const row = new discord_js_1.ActionRowBuilder().addComponents(new discord_js_1.ButtonBuilder()
            .setCustomId('giveRole')
            .setStyle(discord_js_1.ButtonStyle.Primary)
            .setLabel('역할 받기'));
        msg.channel.send({ content: '규칙을 확인하신 후, 아래 버튼을 눌러 역할을 부여받으세요', components: [row] });
        msg.delete();
    }),
});
