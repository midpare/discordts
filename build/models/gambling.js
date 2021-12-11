"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gambling = void 0;
var mongoose_1 = require("mongoose");
var gamblingInfo = new mongoose_1.Schema({
    id: String,
    name: String,
    date: Number,
    money: Number,
    debt: Number,
    gamLevel: Number,
    baseMoneyCoolTime: Number,
    bankruptcy: String,
    stock: [{ name: String, count: Number, money: Number }, { _id: false }]
});
var gambling = (0, mongoose_1.model)('gambling', gamblingInfo);
exports.gambling = gambling;
