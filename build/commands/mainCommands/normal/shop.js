"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var discord_js_1 = require("discord.js");
var gambling_1 = require("../../../models/gambling");
module.exports = {
    name: "상점",
    execute: function (_a) {
        var msg = _a.msg, args = _a.args;
        return __awaiter(void 0, void 0, void 0, function () {
            var embed, id, user;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        embed = new discord_js_1.MessageEmbed();
                        id = msg.author.id;
                        return [4 /*yield*/, gambling_1.gambling.findOne({ id: id })];
                    case 1:
                        user = _b.sent();
                        if (!user)
                            return [2 /*return*/, msg.reply("가입되지 않은 유저입니다 !가입 을 통해 가입해주시기 바랍니다.")];
                        switch (args[0]) {
                            default:
                                embed
                                    .setTitle("상점")
                                    .setDescription("!상점 구매 <이름>으로 구매하실 수 있습니다")
                                    .addFields({ name: "도박권 가위바위보", value: "가위바위보 도박을 할 수 있는 도박권을 구매합니다. \n가격: 30만원", inline: false }, { name: "베팅권", value: "베팅을 시작하고 종료할 수있는 권한을 구매합니다. \n가격: 150만원", inline: false }, { name: "부방장", value: "부방장이 될 수 있는 권한을 구매합니다. \n가격: 10억", inline: false });
                                msg.channel.send({ embeds: [embed] });
                                break;
                            case "구매":
                                switch (args[1]) {
                                    case "도박권":
                                        switch (args[2]) {
                                            case "가위바위보":
                                                if (user.gamLevel % 2 == 0)
                                                    return [2 /*return*/, msg.reply("이미 이 도박권을 구매한 유저입니다.")];
                                                if (user.money < 300000)
                                                    return [2 /*return*/, msg.reply("이 도박권을 살 충분한 돈을 보유하고 있지 않습니다.")];
                                                gambling_1.gambling.updateOne({ id: id }, { $inc: { money: -300000 }, $mul: { gamLevel: 2 } })
                                                    .then(function () { return msg.reply("성공적으로 가위바위보 도박권을 구매했습니다!"); });
                                                break;
                                        }
                                        break;
                                    case "베팅권":
                                        if (user.gamLevel % 3 == 0)
                                            return [2 /*return*/, msg.reply('이미 이 베팅권을 구매한 유저입니다.')];
                                        if (user.money < 1500000)
                                            return [2 /*return*/, msg.reply("이 권한을 살 충분한 돈을 보유하고 있지 않습니다.")];
                                        gambling_1.gambling.updateOne({ id: id }, { $inc: { money: -1500000 }, $mul: { gamLevel: 3 } });
                                        break;
                                }
                                break;
                        }
                        return [2 /*return*/];
                }
            });
        });
    }
};
