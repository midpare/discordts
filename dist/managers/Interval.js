"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Interval = void 0;
class Interval {
    constructor(options) {
        this.immediate = options.immediate;
        this.interval = options.interval;
        this.execute = options.execute;
    }
}
exports.Interval = Interval;
