"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Command = void 0;
class Command {
    constructor(options) {
        this.name = options.name;
        this.execute = options.execute;
        Object.assign(this, options);
    }
}
exports.Command = Command;
