"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var discord_player_1 = require("discord-player");
var client_1 = __importDefault(require("./client"));
var player = new discord_player_1.Player(client_1.default, {
    ytdlOptions: {
        quality: 'highestaudio',
        highWaterMark: 1 << 25
    }
});
exports.default = player;
