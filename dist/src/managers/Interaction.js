"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InteractionCommand = void 0;
class InteractionCommand {
    constructor(options) {
        this.name = options.name;
        this.private = options.private;
        this.execute = options.execute;
    }
}
exports.InteractionCommand = InteractionCommand;
