"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var discord_js_1 = require("discord.js");
var client = new discord_js_1.Client({ intents: 32767 });
client.mainCommands = new discord_js_1.Collection();
client.mainAliases = new discord_js_1.Collection();
client.subCommands = new discord_js_1.Collection();
client.subAliases = new discord_js_1.Collection();
client.coin = new discord_js_1.Collection();
client.interactions = new discord_js_1.Collection();
// client.coin = new Collection()
exports.default = client;
var testClient = /** @class */ (function (_super) {
    __extends(testClient, _super);
    function testClient() {
        var _this = _super.call(this, { intents: 32767 }) || this;
        _this.commands = new discord_js_1.Collection();
        return _this;
    }
    return testClient;
}(discord_js_1.Client));
