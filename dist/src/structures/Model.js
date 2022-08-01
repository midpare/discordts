"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Model = void 0;
const gambling_1 = require("../models/gambling");
const school_1 = require("../models/school");
const attendance_1 = require("../models/attendance");
const slang_1 = require("../models/slang");
const config_1 = require("../models/config");
class Model {
    constructor() {
        this.gambling = gambling_1.gambling;
        this.school = school_1.school;
        this.attendance = attendance_1.attendance;
        this.slang = slang_1.slang;
        this.config = config_1.config;
    }
}
exports.Model = Model;
