"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gambling = void 0;
const mongoose_1 = require("mongoose");
const gamblingInfo = new mongoose_1.Schema({
    id: String,
    name: String,
    date: Number,
    money: Number,
    debt: Number,
    principalDebt: Number,
    gamLevel: Number,
    baseMoneyCoolTime: Number,
    bankruptcy: String,
    stock: [{ name: String, count: Number, money: Number }, { _id: false }]
});
const gambling = (0, mongoose_1.model)('gambling', gamblingInfo);
exports.gambling = gambling;
