"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var discord_js_1 = require("discord.js");
var client = new discord_js_1.Client({ intents: 32767 });
client.mainCommands = new discord_js_1.Collection();
client.mainAliases = new discord_js_1.Collection();
client.subCommands = new discord_js_1.Collection();
client.subAliases = new discord_js_1.Collection();
client.coin = new discord_js_1.Collection();
client.interactions = new discord_js_1.Collection();
// client.coin = new Collection()
exports.default = client;
