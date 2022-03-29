"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Command = void 0;
class Command {
    constructor(commandOptions) {
        this.name = commandOptions.name;
        this.aliases = commandOptions.aliases ? commandOptions.aliases : null;
        this.category = commandOptions.category;
        this.usage = commandOptions.usage;
        this.description = commandOptions.usage;
        this.execute = commandOptions.execute;
    }
}
exports.Command = Command;
