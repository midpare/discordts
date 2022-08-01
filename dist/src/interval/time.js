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
const Interval_1 = require("../managers/Interval");
exports.default = new Interval_1.Interval({
    execute: (client) => __awaiter(void 0, void 0, void 0, function* () {
        const users = yield client.models.config.find({});
        const time = new Date().getTime();
        for (const user of users) {
            const guild = client.guilds.cache.get(user.guildId);
            const member = guild.members.cache.get(user.id);
            if (time < user.banTime) {
                guild.members.unban(member);
            }
        }
    }),
    interval: '5m',
    immediate: false,
});
