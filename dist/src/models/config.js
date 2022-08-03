"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const mongoose_1 = require("mongoose");
const configInfo = new mongoose_1.Schema({
    id: String,
    name: String,
    guildId: String,
    slangs: [String],
    warning: { type: Number, default: 0 },
    baseMoneyCoolTime: { type: Number, default: 0 },
    bankruptcyTime: { type: Number, default: 0 },
    banTime: { type: Number, default: 0 },
    MuteTime: { type: Number, default: 0 },
}, {
    versionKey: false
});
exports.config = (0, mongoose_1.model)('config', configInfo);
