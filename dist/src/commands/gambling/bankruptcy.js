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
const Utils_1 = require("../../structures/Utils");
const InteractionOptions_1 = require("../../structures/InteractionOptions");
exports.default = new Commands_1.Command({
    name: '파산',
    category: '도박',
    usage: '파산',
    description: '모든 돈과 빚을 0원으로 만들고 한시간동안 도박을 하지 못합니다.',
    execute: ({ msg, args, client }) => __awaiter(void 0, void 0, void 0, function* () {
        const id = msg.author.id;
        const customIds = Utils_1.Utils.uuid(2);
        const [bankrupctyId, cancelId] = customIds;
        const row = new discord_js_1.MessageActionRow().addComponents(new discord_js_1.MessageButton()
            .setLabel(client.messages.yes)
            .setStyle('SUCCESS')
            .setCustomId(bankrupctyId), new discord_js_1.MessageButton()
            .setLabel(client.messages.no)
            .setStyle('DANGER')
            .setCustomId(cancelId));
        const message = yield msg.reply({ content: '정말 파산하시겠습니까? 파산하시면 돈과 빚이 모두 0원으로 돌아가며 한시간동안 도박을 할 수 없습니다.', components: [row] });
        client.interactionOptions.set(bankrupctyId, new InteractionOptions_1.InteractionOptions({
            id,
            cmd: 'bankrupcty',
            message,
            customIds,
        }));
        client.interactionOptions.set(cancelId, new InteractionOptions_1.InteractionOptions({
            id,
            cmd: 'cancel',
            message,
            customIds,
        }));
    }),
});
