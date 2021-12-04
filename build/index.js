"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = __importDefault(require("./clients/client"));
var mongoose_1 = __importDefault(require("mongoose"));
require("dotenv/config");
var handler = new Array('commands', 'interactions', 'events', 'coinList');
handler.forEach(function (element) {
    require(__dirname + "/handler/" + element)(client_1.default);
});
mongoose_1.default.connect(process.env.DB_URI || '');
client_1.default.login(process.env.TOKEN);
