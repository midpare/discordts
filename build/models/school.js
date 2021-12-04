"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.school = void 0;
var mongoose_1 = require("mongoose");
var schoolInfo = new mongoose_1.Schema({
    id: String,
    name: String,
    cityCode: String,
    cityName: String,
    schoolCode: String,
    schoolName: String,
    grade: String,
    class: String,
});
var school = (0, mongoose_1.model)('school', schoolInfo);
exports.school = school;
