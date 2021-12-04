"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var client_1 = __importDefault(require("../clients/client"));
module.exports = {
    name: 'ready',
    event: function () {
        client_1.default.user.setActivity('개발');
        console.log("Logged in as " + client_1.default.user.tag + "!");
    }
};
