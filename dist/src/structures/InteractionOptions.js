"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InteractionOptions = void 0;
class InteractionOptions {
    constructor(options) {
        this.ids = options.ids;
        this.cmd = options.cmd;
        this.customIds = options.customIds;
        this.messages = options.messages;
        this.etc = options.etc;
    }
}
exports.InteractionOptions = InteractionOptions;
