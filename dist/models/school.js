"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const Model_1 = require("../managers/Model");
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
exports.default = new Model_1.Model('school', schoolInfo);
