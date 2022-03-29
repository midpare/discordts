"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.attendance = void 0;
const mongoose_1 = require("mongoose");
const attendanceInfo = new mongoose_1.Schema({
    id: String,
}, {
    versionKey: false
});
const attendance = (0, mongoose_1.model)('attendance', attendanceInfo);
exports.attendance = attendance;
