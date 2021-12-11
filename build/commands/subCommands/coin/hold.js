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
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var discord_js_1 = require("discord.js");
var client_1 = __importDefault(require("../../../clients/client"));
var function_1 = require("../../../handler/function");
var gambling_1 = require("../../../models/gambling");
module.exports = {
    name: '보유',
    category: 'coin',
    aliases: ['보유량'],
    execute: function (_a) {
        var msg = _a.msg, args = _a.args;
        return __awaiter(void 0, void 0, void 0, function () {
            var id, embed, user, stock, stock_1, stock_1_1, element, options, coin, persent, persentShown, profit, profitShown, e_1_1;
            var e_1, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        id = msg.author.id;
                        embed = new discord_js_1.MessageEmbed();
                        return [4 /*yield*/, gambling_1.gambling.findOne({ id: id })];
                    case 1:
                        user = _c.sent();
                        stock = user.stock;
                        if (!stock[0])
                            return [2 /*return*/, msg.reply('보유한 코인이 없습니다.')];
                        embed
                            .setTitle(msg.author.username + "\uB2D8\uC758 \uCF54\uC778 \uBCF4\uC720 \uD604\uD669");
                        _c.label = 2;
                    case 2:
                        _c.trys.push([2, 7, 8, 9]);
                        stock_1 = __values(stock), stock_1_1 = stock_1.next();
                        _c.label = 3;
                    case 3:
                        if (!!stock_1_1.done) return [3 /*break*/, 6];
                        element = stock_1_1.value;
                        options = {
                            uri: "https://crix-api-endpoint.upbit.com/v1/crix/candles/days/?code=CRIX.UPBIT." + client_1.default.coin.get(element.name) + "&count=1&to"
                        };
                        return [4 /*yield*/, (0, function_1.requestGet)(options)];
                    case 4:
                        coin = _c.sent();
                        persent = Math.round((coin[0].tradePrice / element.money - 1) * 100 * 100) / 100;
                        persentShown = persent < 0 ? persent : '+' + persent;
                        profit = Math.round((coin[0].tradePrice - element.money) * element.count);
                        profitShown = profit < 0 ? profit.toLocaleString() : '+' + profit.toLocaleString();
                        embed.addField(element.name, "\uC218\uB7C9: " + element.count + "\uAC1C, \uD3C9\uB2E8\uAC00: " + Math.floor(element.money).toLocaleString() + "\uC6D0\n\uC190\uC775: " + profitShown + "\uC6D0(" + persentShown + "%)", false);
                        _c.label = 5;
                    case 5:
                        stock_1_1 = stock_1.next();
                        return [3 /*break*/, 3];
                    case 6: return [3 /*break*/, 9];
                    case 7:
                        e_1_1 = _c.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 9];
                    case 8:
                        try {
                            if (stock_1_1 && !stock_1_1.done && (_b = stock_1.return)) _b.call(stock_1);
                        }
                        finally { if (e_1) throw e_1.error; }
                        return [7 /*endfinally*/];
                    case 9:
                        msg.channel.send({ embeds: [embed] });
                        return [2 /*return*/];
                }
            });
        });
    }
};
