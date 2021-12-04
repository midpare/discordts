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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var gambling_1 = require("../../../models/gambling");
var client_1 = __importDefault(require("../../../clients/client"));
var function_1 = require("../../../handler/function");
module.exports = {
    name: '판매',
    aliases: ['매도'],
    category: 'coin',
    execute: function (_a) {
        var msg = _a.msg, args = _a.args;
        return __awaiter(void 0, void 0, void 0, function () {
            var id, user, stock, userCoin, coinName, coin, count, coinMoney, money, profit, profitShown, persent, persentShown;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        id = msg.author.id;
                        return [4 /*yield*/, gambling_1.gambling.findOne({ id: id })];
                    case 1:
                        user = _b.sent();
                        stock = user.stock;
                        userCoin = stock.filter(function (element) { return element.name == args[1]; })[0];
                        coinName = args[1];
                        return [4 /*yield*/, (0, function_1.requestGet)({ uri: "https://crix-api-endpoint.upbit.com/v1/crix/candles/days/?code=CRIX.UPBIT." + client_1.default.coin.get(args[1]) + "&count=1&to" })];
                    case 2:
                        coin = _b.sent();
                        if (!coinName)
                            return [2 /*return*/, msg.reply('판매할 코인을 입력해주시기바랍니다.')];
                        if (!userCoin)
                            return [2 /*return*/, msg.reply('이 코인을 가지고 있지 않습니다.')];
                        count = parseFloat(args[2]);
                        if (!Number.isInteger(count) || count <= 0)
                            return [2 /*return*/, msg.reply('정확한 수량을 입력해주시기바랍니다.')];
                        if (userCoin.count < count)
                            return [2 /*return*/, msg.reply("\uD30C\uB824\uB294 \uCF54\uC778\uC758 \uAC1C\uC218\uAC00 \uD604\uC7AC \uCF54\uC778\uAC1C\uC218\uBCF4\uB2E4 \uB9CE\uC2B5\uB2C8\uB2E4.\n\uD604\uC7AC \uAC1C\uC218: " + userCoin.count + "\uAC1C")];
                        coinMoney = coin[0].tradePrice;
                        money = coinMoney * count;
                        profit = Math.floor((coinMoney - userCoin.money) * count).toLocaleString();
                        profitShown = money < userCoin.money * count ? profit : '+' + profit;
                        persent = Math.round((coinMoney / userCoin.money - 1) * 100 * 100) / 100;
                        persentShown = persent < 0 ? persent : '+' + persent;
                        if (userCoin.count == count) {
                            gambling_1.gambling.updateOne({ id: id }, { $pull: { stock: userCoin }, $inc: { money: Math.round(money) } }).then(function () {
                                msg.reply("\uC131\uACF5\uC801\uC73C\uB85C " + coinName + " " + count.toLocaleString() + "\uAC1C\uB97C " + money.toLocaleString() + "\uC6D0(\uAC1C\uB2F9 " + coinMoney + "\uC6D0)\uC5D0 \uD310\uB9E4\uD588\uC2B5\uB2C8\uB2E4!\n\uC190\uC775: " + profitShown + "\uC6D0(" + persentShown + "%)");
                            });
                        }
                        else {
                            gambling_1.gambling.updateOne({ id: id, stock: userCoin }, { $inc: { 'stock.$.count': -count, money: Math.round(money) } }).then(function () {
                                msg.reply("\uC131\uACF5\uC801\uC73C\uB85C " + coinName + " " + count.toLocaleString() + "\uAC1C\uB97C " + money.toLocaleString() + "\uC6D0(\uAC1C\uB2F9 " + coinMoney + "\uC6D0)\uC5D0 \uD310\uB9E4\uD588\uC2B5\uB2C8\uB2E4!\n\uD604\uC7AC \uCF54\uC778\uAC1C\uC218: " + userCoin.count + "\uAC1C -> " + (userCoin.count - count) + "\uAC1C\n\uC190\uC775: " + profitShown + "\uC6D0(" + persentShown + "%)");
                            });
                        }
                        return [2 /*return*/];
                }
            });
        });
    }
};
