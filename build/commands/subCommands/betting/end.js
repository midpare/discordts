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
var gambling_1 = require("../../../models/gambling");
var betting_1 = require("../../../typings/betting");
module.exports = {
    name: '종료',
    category: 'betting',
    execute: function (_a) {
        var msg = _a.msg, args = _a.args;
        if (!betting_1.betting.betting)
            return msg.reply('아직 베팅을 시작하지 않았습니다.');
        var winner = args[1];
        if (winner != betting_1.bet1.name && winner != betting_1.bet2.name)
            return msg.reply(betting_1.bet1.name + "\uACFC " + betting_1.bet2.name + "\uC911 \uC2B9\uB9AC\uD300\uC744 \uC120\uD0DD\uD574\uC8FC\uC2DC\uAE30 \uBC14\uB78D\uB2C8\uB2E4.");
        switch (winner) {
            case betting_1.bet1.name:
                result(betting_1.bet1);
                break;
            case betting_1.bet2.name:
                result(betting_1.bet2);
                break;
        }
        function result(bet) {
            return __awaiter(this, void 0, void 0, function () {
                var i, id, moneyResult;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            msg.reply(bet.name + "\uD300\uC774 \uC2B9\uB9AC\uD588\uC2B5\uB2C8\uB2E4!");
                            i = 0;
                            _a.label = 1;
                        case 1:
                            if (!(i < bet.list.length)) return [3 /*break*/, 4];
                            id = bet.list[i].id;
                            moneyResult = bet.list[i].money * bet.times;
                            return [4 /*yield*/, gambling_1.gambling.updateOne({ id: id }, { $inc: { money: moneyResult } })];
                        case 2:
                            (_a.sent()).matchedCount;
                            _a.label = 3;
                        case 3:
                            i++;
                            return [3 /*break*/, 1];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        }
        betting_1.bet1.list = [];
        betting_1.bet2.list = [];
        betting_1.betting.betting = false;
    }
};
