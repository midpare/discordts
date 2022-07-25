"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InteractionOptions = void 0;
class InteractionOptions {
    constructor(options) {
        this.id = options.id;
        this.cmd = options.cmd;
        this.customIds = options.customIds;
        this.message = options.message;
    }
}
exports.InteractionOptions = InteractionOptions;
