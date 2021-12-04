"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.warning = void 0;
var mongoose_1 = require("mongoose");
var warningInfo = new mongoose_1.Schema({
    id: String,
    name: String,
    warning: Number
});
var warning = (0, mongoose_1.model)('warning', warningInfo);
exports.warning = warning;
