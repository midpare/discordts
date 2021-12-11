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
module.exports = {
    name: '기초자금',
    aliases: ['초기자금'],
    category: 'gambling',
    use: '기초자금',
    description: '기초자금 25,500원을 획득합니다. 돈이 0원일때만 명령어 사용이 가능합니다. 쿨타임: 60초',
    execute: function (_a) {
        var msg = _a.msg, args = _a.args;
        return __awaiter(void 0, void 0, void 0, function () {
            var id, user, date, second, coolTime, userCoolTime, baseMoney;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        id = msg.author.id;
                        return [4 /*yield*/, gambling_1.gambling.findOne({ id: id })];
                    case 1:
                        user = _b.sent();
                        if (user.money != 0 || user.stock[0])
                            return [2 /*return*/, msg.reply('보유하신 자산이 있어 기초자금을 지급할 수 없습니다.')];
                        date = new Date();
                        second = date.getTime();
                        coolTime = 60;
                        if (user.baseMoneyCoolTime) {
                            userCoolTime = user.baseMoneyCoolTime;
                            if ((second - userCoolTime) / 1000 < coolTime)
                                return [2 /*return*/, msg.reply("\uBA85\uB839\uC5B4\uC758 \uCFE8\uD0C0\uC784\uC774 " + Math.ceil(coolTime - (second - userCoolTime) / 1000) + "\uCD08 \uB0A8\uC558\uC2B5\uB2C8\uB2E4.")];
                        }
                        baseMoney = 25000;
                        gambling_1.gambling.updateOne({ id: id }, { $set: { money: baseMoney, baseMoneyCoolTime: second } })
                            .then(function () { return msg.reply("\uAE30\uCD08\uC790\uAE08 " + baseMoney.toLocaleString() + "\uC6D0\uC774 \uC9C0\uAE09\uB418\uC5C8\uC2B5\uB2C8\uB2E4!"); });
                        return [2 /*return*/];
                }
            });
        });
    }
};
