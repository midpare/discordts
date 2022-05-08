"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtendClient = void 0;
const discord_js_1 = require("discord.js");
const CivilWar_1 = require("./CivilWar");
const message_1 = require("../language/message");
class ExtendClient extends discord_js_1.Client {
    constructor(options) {
        super(options);
        this.commands = new discord_js_1.Collection();
        this.interactions = new discord_js_1.Collection();
        this.coin = new discord_js_1.Collection();
        this.sdCode = new discord_js_1.Collection();
        this.betting = new discord_js_1.Collection();
        this.civilWar = new CivilWar_1.CivilWar();
        this.messages = new message_1.Messages();
    }
}
exports.ExtendClient = ExtendClient;
