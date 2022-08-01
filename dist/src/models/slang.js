"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.slang = void 0;
const mongoose_1 = require("mongoose");
const slanginfo = new mongoose_1.Schema({
    id: String,
    name: String,
    slangs: [String],
}, {
    versionKey: false
});
exports.slang = (0, mongoose_1.model)('slang', slanginfo);
