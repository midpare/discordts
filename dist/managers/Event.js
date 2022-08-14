"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Event = void 0;
class Event {
    constructor(options) {
        this.name = options.name;
        this.execute = options.execute;
    }
}
exports.Event = Event;
