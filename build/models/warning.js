"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.warning = void 0;
const mongoose_1 = require("mongoose");
const warningInfo = new mongoose_1.Schema({
    id: String,
    name: String,
    warning: Number,
});
const warning = (0, mongoose_1.model)('warning', warningInfo);
exports.warning = warning;
