"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Command = void 0;
class Command {
    constructor(options) {
        var _a;
        Object.assign(this, options);
        this.name = options.name;
        this.category = options.category;
        this.usage = (_a = options.usage) !== null && _a !== void 0 ? _a : options.name;
        this.description = options.description;
        this.execute = options.execute;
    }
}
exports.Command = Command;
