"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = void 0;
const discord_js_1 = __importStar(require("discord.js"));
const CivilWar_1 = require("./CivilWar");
const message_1 = require("../language/message");
const Model_1 = require("./Model");
class Client extends discord_js_1.default.Client {
    constructor(options) {
        super(options);
        this.commands = new discord_js_1.Collection();
        this.interactions = new discord_js_1.Collection();
        this.interactionOptions = new discord_js_1.Collection();
        this.coin = new discord_js_1.Collection();
        this.sdCode = new discord_js_1.Collection();
        this.betting = new discord_js_1.Collection();
        this.civilWar = new CivilWar_1.CivilWar();
        this.messages = new message_1.Messages();
        this.models = new Model_1.Model();
    }
}
exports.Client = Client;
