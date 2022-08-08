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
const rules_1 = require("../../language/rules");
const Command_1 = require("../../managers/Command");
exports.default = new Command_1.Command({
    name: '규칙',
    category: '기본',
    usage: '규칙',
    description: '규칙을 확인합니다.',
    execute: ({ interaction }) => __awaiter(void 0, void 0, void 0, function* () {
        const embed = new discord_js_1.EmbedBuilder()
            .setTitle('규칙');
        const rules = new rules_1.Rules();
        for (const [name, value] of Object.entries(rules)) {
            embed.addFields({ name, value: value.join('\n'), inline: false });
        }
        interaction.reply({ embeds: [embed] });
    }),
});
