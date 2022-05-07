"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Command = void 0;
class Command {
    constructor(options) {
        this.name = options.name;
        this.aliases = options.aliases ? options.aliases : null;
        this.category = options.category;
        this.usage = options.usage;
        this.description = options.description;
        this.execute = options.execute;
    }
}
exports.Command = Command;
