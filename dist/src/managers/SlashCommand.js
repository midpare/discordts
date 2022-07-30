"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlashCommand = void 0;
class SlashCommand {
    constructor(options) {
        this.name = options.name;
        this.category = options.category;
        this.description = options.description;
        this.execute = options.execute;
        Object.assign(this, options);
    }
}
exports.SlashCommand = SlashCommand;
