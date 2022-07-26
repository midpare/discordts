"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Command = void 0;
class Command {
    constructor(options) {
        var _a;
        this.name = options.name;
        this.aliases = (_a = options.aliases) !== null && _a !== void 0 ? _a : null;
        this.category = options.category;
        this.usage = options.usage;
        this.description = options.description;
        this.private = options.private;
        this.execute = options.execute;
    }
}
exports.Command = Command;
