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
const Command_1 = require("../../managers/Command");
const Utils_1 = require("../../structures/Utils");
exports.default = new Command_1.Command({
    name: '올인',
    aliases: ['ㅇㅇ'],
    category: '도박',
    description: '자신의 모든 돈을 걸고 도박을 진행합니다. (성공시: 2배, 실패시: 0배)',
    execute: ({ interaction, client }) => __awaiter(void 0, void 0, void 0, function* () {
        const { user: { id }, guildId } = interaction;
        const user = yield client.models.gambling.findOne({ id, guildId });
        if (user.money <= 0) {
            Utils_1.Utils.reply(interaction, client.messages.noneMoney);
            return 0;
        }
        const random = Math.floor(Math.random() * 2);
        if (random == 1) {
            (yield client.models.gambling.updateOne({ id, guildId }, { $mul: { money: 2 } })).matchedCount;
            interaction.reply(client.messages.gambling.successGamb(user.money, user.money));
        }
        else if (random == 0) {
            (yield client.models.gambling.updateOne({ id, guildId }, { $set: { money: 0 } })).matchedCount;
            interaction.reply(client.messages.gambling.failureGamb(user.money, user.money));
        }
        return 1;
    }),
});
