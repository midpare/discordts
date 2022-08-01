"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlashCommand = void 0;
class SlashCommand {
    constructor(options) {
        var _a;
        this.name = options.name;
        this.category = options.category;
        this.usage = (_a = options.usage) !== null && _a !== void 0 ? _a : options.name;
        this.description = options.description;
        this.execute = options.execute;
        Object.assign(this, options);
    }
}
exports.SlashCommand = SlashCommand;
