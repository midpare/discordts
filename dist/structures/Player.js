"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_player_1 = require("discord-player");
const Client_1 = require("./Client");
const player = new discord_player_1.Player(Client_1.client, {
    ytdlOptions: {
        quality: 'highestaudio',
        highWaterMark: 1 << 25,
    },
});
exports.default = player;
