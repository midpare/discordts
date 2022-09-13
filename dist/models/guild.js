"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const Model_1 = require("../managers/Model");
const guildInfo = new mongoose_1.Schema({
    id: String,
    punishment: { type: String, default: '0' },
    gambling: { type: String, default: '0' },
    command: { type: String, default: '0' },
    slang: { type: String, default: '0' },
    alarm: [{ type: String, default: '0' }],
    civilWar: [{ type: String, default: '0' }],
    log: {
        join: { type: String, default: '0' },
        exit: { type: String, default: '0' },
        command: { type: String, default: '0' },
        message: { type: String, default: '0' },
        voice: { type: String, default: '0' },
    },
    temporaryRole: { type: String, default: '0' },
    baseRole: { type: String, default: '0' },
}, {
    versionKey: false
});
exports.default = new Model_1.Model('guild', guildInfo);
