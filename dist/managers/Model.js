"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Model = void 0;
const mongoose_1 = require("mongoose");
class Model {
    constructor(name, schema) {
        this.name = name;
        this.model = (0, mongoose_1.model)(name, schema);
    }
}
exports.Model = Model;
