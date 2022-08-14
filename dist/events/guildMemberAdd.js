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
const Event_1 = require("../managers/Event");
exports.default = new Event_1.Event({
    name: 'guildMemberAdd',
    execute: (client, member) => __awaiter(void 0, void 0, void 0, function* () {
        const guild = yield client.models.guild.findOne({ id: member.guild.id });
        const temporary = guild.temporaryRole;
        if (temporary == '0')
            return;
        try {
            member.roles.add(temporary);
        }
        catch (error) {
            console.error(error);
        }
    }),
});
