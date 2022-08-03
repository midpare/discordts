"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Command = void 0;
class Command {
    constructor(options) {
        Object.assign(this, options);
        this.name = options.name;
        this.execute = options.execute;
    }
}
exports.Command = Command;
