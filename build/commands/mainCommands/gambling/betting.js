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
var betting_1 = require("../../../typings/betting");
var gambling_1 = require("../../../models/gambling");
var client_1 = __importDefault(require("../../../clients/client"));
module.exports = {
    name: '베팅',
    category: 'gambling',
    use: '베팅',
    description: '베팅을 합니다.',
    execute: function (_a) {
        var msg = _a.msg, args = _a.args;
        return __awaiter(void 0, void 0, void 0, function () {
            function bettingFunction(bet) {
                return __awaiter(this, void 0, void 0, function () {
                    function posFunction(element) {
                        if (element.id === user.id)
                            return true;
                    }
                    var user, posArray, arr_1;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, gambling_1.gambling.findOne({ id: id })];
                            case 1:
                                user = _a.sent();
                                if (money > user.money)
                                    return [2 /*return*/, msg.reply("\uC790\uC2E0\uC758 \uB3C8\uBCF4\uB2E4 \uB9CE\uC740\uB3C8\uC740 \uC785\uB825\uD574\uC2E4 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4. \n\uD604\uC7AC\uC794\uC561: " + user.money.toLocaleString() + "\uC6D0")];
                                posArray = bet.list.filter(function (item) { return item.id === user.id; });
                                if (posArray.length <= 0) {
                                    bet.list.push({ id: user.id, money: money });
                                    gambling_1.gambling.updateOne({ id: id }, { $inc: { money: -money } })
                                        .then(function () { return msg.reply(user.name + "\uB2D8\uC774 \"" + bet.name + "\"\uC5D0 " + money.toLocaleString() + "\uC6D0\uC744 \uBCA0\uD305\uD588\uC2B5\uB2C8\uB2E4! \n\uD604\uC7AC\uC794\uC561 " + user.money.toLocaleString() + "\uC6D0 -> " + (user.money - money).toLocaleString() + "\uC6D0"); });
                                    bet.moneyBefore = money;
                                }
                                else {
                                    arr_1 = bet.list.findIndex(posFunction);
                                    if (bet.list[arr_1].money + money < 0)
                                        return [2 /*return*/, msg.reply("\uBCA0\uD305\uC561\uBCF4\uB2E4 \uD070 \uAE08\uC561\uC744 \uBE84 \uC218\uB294 \uC5C6\uC2B5\uB2C8\uB2E4 \n\uD604\uC7AC \uBCA0\uD305\uC561: " + bet.list[arr_1].money.toLocaleString())];
                                    bet.list.splice(arr_1, 1, { id: user.id, money: bet.moneyBefore + money });
                                    gambling_1.gambling.updateOne({ id: id }, { $inc: { money: -money } })
                                        .then(function () { return msg.reply(user.name + "\uB2D8\uC774 \"" + bet.name + "\"\uC5D0 " + money.toLocaleString() + "\uC6D0\uC744 \uCD94\uAC00\uB85C \uBCA0\uD305\uD588\uC2B5\uB2C8\uB2E4! \n\uD604\uC7AC \uBCA0\uD305\uC561: " + (bet.list[arr_1].money - money).toLocaleString() + "\uC6D0 -> " + bet.list[arr_1].money.toLocaleString() + "\uC6D0 \n\uD604\uC7AC\uC794\uC561 " + user.money.toLocaleString() + "\uC6D0 -> " + (user.money - money).toLocaleString() + "\uC6D0"); });
                                    bet.moneyBefore = bet.list[arr_1].money;
                                }
                                return [2 /*return*/];
                        }
                    });
                });
            }
            var id, command, alias, money;
            return __generator(this, function (_b) {
                id = msg.author.id;
                command = client_1.default.subCommands.get('betting').get(args[0]);
                alias = client_1.default.subAliases.get('betting').get(args[0]);
                if (command) {
                    command.execute({ msg: msg, args: args });
                    return [2 /*return*/];
                }
                else if (alias) {
                    alias.execute(msg, { args: args });
                    return [2 /*return*/];
                }
                if (!betting_1.betting.betting)
                    return [2 /*return*/, msg.reply('아직 베팅을 시작하지 않았습니다.')];
                if (args[0] != betting_1.bet1.name && args[0] != betting_1.bet2.name)
                    return [2 /*return*/];
                money = parseFloat(args[1]);
                if (!Number.isInteger(money))
                    return [2 /*return*/, msg.reply('정확한 자연수를 입력해주시기바랍니다.')];
                switch (args[0]) {
                    case betting_1.bet1.name:
                        bettingFunction(betting_1.bet1);
                        break;
                    case betting_1.bet2.name:
                        bettingFunction(betting_1.bet2);
                        break;
                }
                return [2 /*return*/];
            });
        });
    }
};
