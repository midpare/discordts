"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Interaction = void 0;
class Interaction {
    constructor(options) {
        this.name = options.name;
        this.private = options.private;
        this.execute = options.execute;
    }
}
exports.Interaction = Interaction;
