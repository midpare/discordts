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
    name: 'rsp',
    aliases: ['가위바위보'],
    category: 'gambling',
    use: 'rsp <가위/바위/보> <돈>',
    description: '<돈>을 걸고 가위바위보 도박을 진행합니다. (승리시: 2.5배, 비길시: 0.6배, 패배시: 0배)',
    execute: function (_a) {
        var msg = _a.msg, args = _a.args;
        return __awaiter(void 0, void 0, void 0, function () {
            var id, user, money, rspArgs, even, random, human, bot, winner;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        id = msg.author.id;
                        return [4 /*yield*/, gambling_1.gambling.findOne({ id: id })];
                    case 1:
                        user = _b.sent();
                        if (user.gamLevel % 2 != 0)
                            return [2 /*return*/, msg.reply('이 도박을 할 수 있는 권한이 없습니다 \n!상점에서 도박권을 구매하십시오')];
                        money = parseFloat(args[1]);
                        if (isNaN(money))
                            return [2 /*return*/, msg.reply('베팅할 돈을 입력해주시기바랍니다.')];
                        if (money > user.money)
                            return [2 /*return*/, msg.reply('현재 잔액보다 높은돈을 입력하실수없습니다.')];
                        rspArgs = ['가위', '바위', '보'];
                        even = function (element) { return msg.content.includes(element); };
                        if (!rspArgs.some(even))
                            return [2 /*return*/, msg.reply('가위, 바위, 보 중 하나를 입력해주시기바랍니다.\n !rsp <가위/바위/보> <돈>')];
                        random = Math.floor(Math.random() * 3);
                        human = args[0];
                        bot = rspArgs[random];
                        winner = '';
                        if (human === bot) {
                            winner = '비김';
                        }
                        else {
                            human === '보' ? (winner = bot === '가위' ? '봇' : '인간') : '';
                            human === '가위' ? (winner = bot === '바위' ? '봇' : '인간') : '';
                            human === '바위' ? (winner = bot === '보' ? '봇' : '인간') : '';
                        }
                        if (winner === '비김') {
                            gambling_1.gambling.updateOne({ id: id }, { $inc: { money: money * -0.4 } })
                                .then(function () { return msg.reply("\uC0AC\uB78C: " + human + " \uBD07: " + bot + "\n\uBE44\uACBC\uC2B5\uB2C8\uB2E4.\n" + money * 0.4 + "\uC6D0\uB97C \uC783\uAC8C\uB429\uB2C8\uB2E4.\n\uC794\uC561: " + user.money + "\uC6D0 -> " + (user.money - money * 0.4) + "\uC6D0"); });
                        }
                        if (winner === '봇') {
                            gambling_1.gambling.updateOne({ id: id }, { $inc: { money: -money } })
                                .then(function () { return msg.reply("\uC0AC\uB78C: " + human + " \uBD07: " + bot + "\n" + winner + "\uC774 \uC2B9\uB9AC\uD588\uC2B5\uB2C8\uB2E4.\n" + money + "\uC6D0\uC744 \uC783\uAC8C \uB429\uB2C8\uB2E4.\n\uC794\uC561: " + user.money + "\uC6D0 -> " + (user.money - money) + "\uC6D0"); });
                        }
                        if (winner === '인간') {
                            gambling_1.gambling.updateOne({ id: id }, { $inc: { money: money * 1.5 } })
                                .then(function () { return msg.reply("\uC0AC\uB78C: " + human + " \uBD07: " + bot + "\n" + winner + "\uC774 \uC2B9\uB9AC\uD588\uC2B5\uB2C8\uB2E4.\n" + money * 1.5 + "\uC6D0\uC744 \uC5BB\uC5C8\uC2B5\uB2C8\uB2E4.\n\uC794\uC561: " + user.money + "\uC6D0 -> " + (user.money + money * 1.5) + "\uC6D0"); });
                        }
                        return [2 /*return*/];
                }
            });
        });
    }
};
