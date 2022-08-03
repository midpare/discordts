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
const SlashCommand_1 = require("../../managers/SlashCommand");
exports.default = new SlashCommand_1.SlashCommand({
    name: '경고',
    category: '관리자',
    description: 'test description',
    subCommands: '/warning',
    default_member_permissions: discord_js_1.PermissionFlagsBits.KickMembers + discord_js_1.PermissionFlagsBits.BanMembers,
    execute: ({ interaction, options, client }) => __awaiter(void 0, void 0, void 0, function* () {
        const subCommand = options.getSubcommand();
        const event = client.subCommands.get('경고 ' + subCommand);
        if (!event)
            return;
        event.execute({ interaction, options, client });
    }),
});
