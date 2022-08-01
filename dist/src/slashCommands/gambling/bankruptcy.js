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
const Utils_1 = require("../../structures/Utils");
const InteractionOptions_1 = require("../../structures/InteractionOptions");
const SlashCommand_1 = require("../../managers/SlashCommand");
exports.default = new SlashCommand_1.SlashCommand({
    name: '파산',
    category: '도박',
    description: '모든 돈과 빚을 0원으로 만들고 한시간동안 도박을 하지 못합니다.',
    execute: ({ interaction, client }) => __awaiter(void 0, void 0, void 0, function* () {
        const id = interaction.user.id;
        const customIds = Utils_1.Utils.uuid(2);
        const [yes, no] = customIds;
        const row = new discord_js_1.ActionRowBuilder().addComponents(new discord_js_1.ButtonBuilder()
            .setLabel(client.messages.yes)
            .setStyle(discord_js_1.ButtonStyle.Success)
            .setCustomId(yes), new discord_js_1.ButtonBuilder()
            .setLabel(client.messages.no)
            .setStyle(discord_js_1.ButtonStyle.Danger)
            .setCustomId(no));
        interaction.reply({ content: '정말 파산하시겠습니까? 파산하시면 돈과 빚이 모두 0원으로 돌아가며 한시간동안 도박을 할 수 없습니다.', components: [row] });
        const msg = yield interaction.fetchReply();
        client.interactionOptions.set(yes, new InteractionOptions_1.InteractionOptions({
            ids: [id],
            cmd: 'bankrupcty',
            messages: [msg],
            customIds,
        }));
        client.interactionOptions.set(no, new InteractionOptions_1.InteractionOptions({
            ids: [id],
            cmd: 'cancel',
            messages: [msg],
            customIds,
        }));
    }),
});
