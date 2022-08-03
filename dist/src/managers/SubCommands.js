"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubCommand = void 0;
const discord_js_1 = require("discord.js");
class SubCommand {
    constructor(options) {
        Object.assign(this, options);
        this.name = options.name;
        this.description = options.description;
        this.category = options.category;
        this.execute = options.execute;
        this.type = discord_js_1.ApplicationCommandOptionType.Subcommand;
    }
}
exports.SubCommand = SubCommand;
