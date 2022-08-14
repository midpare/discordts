"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const Model_1 = require("../managers/Model");
const gamblingInfo = new mongoose_1.Schema({
    id: String,
    name: String,
    guildId: String,
    date: { type: Number, default: 0 },
    money: { type: Number, default: 0 },
    debt: { type: Number, default: 0 },
    bankruptcy: { type: Number, default: 0 },
    stock: [{ name: String, count: Number, money: Number }, { _id: false }],
}, {
    versionKey: false
});
exports.default = new Model_1.Model('gambling', gamblingInfo);
