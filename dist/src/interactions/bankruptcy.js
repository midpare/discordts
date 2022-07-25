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
const Interaction_1 = require("../managers/Interaction");
exports.default = new Interaction_1.InteractionCommand({
    name: 'bankrupcty',
    private: true,
    execute: ({ interaction, options, client }) => __awaiter(void 0, void 0, void 0, function* () {
        (yield client.models.gambling.updateOne({ id: interaction.user.id }, { $set: { bankruptcy: new Date().getTime(), money: 0, debt: 0, principalDebt: 0, stock: [] } })).matchedCount;
        interaction.reply(`${interaction.user.username}님이 파산했습니다!`);
    })
});
