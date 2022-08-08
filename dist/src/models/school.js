"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.school = void 0;
const mongoose_1 = require("mongoose");
const schoolInfo = new mongoose_1.Schema({
    id: String,
    guildId: String,
    name: String,
    cityCode: String,
    cityName: String,
    schoolCode: String,
    schoolName: String,
    grade: String,
    class: String,
}, {
    versionKey: false
});
exports.school = (0, mongoose_1.model)('school', schoolInfo);
