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
const Client_1 = require("../structures/Client");
const Interaction_1 = require("../structures/Interaction");
const discord_js_1 = require("discord.js");
exports.default = new Interaction_1.Interaction({
    name: 'giveRole',
    execute: (interaction) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        if (interaction instanceof discord_js_1.ButtonInteraction) {
            interaction.member.roles.add('910521119713394743');
            interaction.member.roles.remove('910521119713394739');
            (_a = interaction.channel) === null || _a === void 0 ? void 0 : _a.send('성공적으로 역할을 지급받았습니다!').then((msg) => {
                setTimeout(() => msg.delete(), 2000);
            });
            const channel = Client_1.client.channels.cache.get('910521192039989288');
            channel.send(`${interaction.user.username}#${interaction.user.discriminator}님이 서버에 입장하였습니다!`);
        }
    }),
});
