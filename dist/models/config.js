"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const Model_1 = require("../managers/Model");
const configInfo = new mongoose_1.Schema({
    id: String,
    name: String,
    guildId: String,
    slangs: [String],
    activity: { type: Boolean, default: false },
    warning: { type: Number, default: 0 },
    banTime: { type: Number, default: 0 },
    MuteTime: { type: Number, default: 0 },
}, {
    versionKey: false
});
exports.default = new Model_1.Model('config', configInfo);
