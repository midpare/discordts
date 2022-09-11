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
exports.default = new Command_1.Command({
    name: '초대링크',
    category: '기본',
    usage: '초대링크',
    description: '초대링크를 생성합니다.',
    execute: ({ interaction, client }) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const channel = interaction.channel;
        const code = yield ((_a = interaction.guild) === null || _a === void 0 ? void 0 : _a.invites.create(channel, { maxAge: 1 * 60 * 60, maxUses: 1 }));
        interaction.reply(`성공적으로 초대링크를 생성했습니다!\n${code}`);
    }),
});
