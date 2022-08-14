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
const Interaction_1 = require("../../managers/Interaction");
const InteractionOptions_1 = require("../../structures/InteractionOptions");
const Utils_1 = require("../../structures/Utils");
exports.default = new Interaction_1.Interaction({
    name: 'grade',
    deleted: true,
    execute: ({ interaction, options, client }) => __awaiter(void 0, void 0, void 0, function* () {
        if (!options)
            return;
        const customIds = Utils_1.Utils.uuid(3);
        const [menuId, cancel, back] = customIds;
        const menuOptions = new Array();
        for (let i = 1; i < 4; i++) {
            const option = {
                label: `${i}학년`,
                description: `${i}학년을 선택합니다`,
                value: `${i}`,
            };
            menuOptions.push(option);
        }
        const selectMenu = new discord_js_1.ActionRowBuilder().addComponents(new discord_js_1.SelectMenuBuilder()
            .setCustomId(menuId)
            .setPlaceholder('이곳을 눌러 선택해주세요')
            .setOptions(menuOptions));
        const button = new discord_js_1.ActionRowBuilder().addComponents(new discord_js_1.ButtonBuilder()
            .setCustomId(cancel)
            .setStyle(discord_js_1.ButtonStyle.Secondary)
            .setLabel('취소'), new discord_js_1.ButtonBuilder()
            .setCustomId(back)
            .setStyle(discord_js_1.ButtonStyle.Secondary)
            .setLabel('뒤로가기'));
        interaction.reply({ content: '자신의 학년을 선택해주시기 바랍니다.', components: [selectMenu, button] });
        const message = yield interaction.fetchReply();
        options.messages = [message];
        options.customIds = customIds;
        client.interactionOptions.set(menuId, InteractionOptions_1.InteractionOption.getNext(options, {
            cmd: 'class',
            data: JSON.parse(interaction.values[0])
        }));
        client.interactionOptions.set(cancel, InteractionOptions_1.InteractionOption.getNext(options, {
            cmd: 'cancel',
        }));
        client.interactionOptions.set(back, InteractionOptions_1.InteractionOption.getNext(options, {
            cmd: 'back',
        }));
    }),
});
