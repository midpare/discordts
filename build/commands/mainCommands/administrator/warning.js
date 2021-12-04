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
var warning_1 = require("../../../models/warning");
module.exports = {
    name: '경고',
    execute: function (_a) {
        var msg = _a.msg, args = _a.args;
        return __awaiter(void 0, void 0, void 0, function () {
            var target, count, id, discriminator, name, user, reason, newUser;
            var _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!msg.member.roles.cache.has('910521119713394745') && !msg.member.roles.cache.has('910521119713394744'))
                            return [2 /*return*/, msg.reply('이 명령어는 부방장 이상만 사용 가능합니다.')];
                        target = (_b = msg.mentions.members) === null || _b === void 0 ? void 0 : _b.first();
                        count = parseFloat(args[2]);
                        if (!target)
                            return [2 /*return*/, msg.reply('맨션을 해 유저를 선택해주시기바랍니다..\n!경고 <부여/차감> <유저> <경고횟수> [사유]').then(function () {
                                    setTimeout(function () { return msg.channel.bulkDelete(2); }, 2000);
                                })];
                        if (count <= 0 || !Number.isInteger(count))
                            return [2 /*return*/, msg.reply('정확한 자연수를 입력해주시기바랍니다.\n!경고 <부여/차감> <유저> <경고횟수> [사유]').then(function () {
                                    setTimeout(function () { return msg.channel.bulkDelete(2); }, 2000);
                                })];
                        if (count > 10)
                            return [2 /*return*/, msg.reply('10회를 초과하는 경고는 부여/차감하실 수 없습니다.\n!경고 <부여/차감> <유저> <경고횟수> [사유]').then(function () {
                                    setTimeout(function () { return msg.channel.bulkDelete(2); }, 2000);
                                })];
                        id = target.id;
                        discriminator = target.user.discriminator;
                        name = target.user.username;
                        return [4 /*yield*/, warning_1.warning.findOne({ id: id })];
                    case 1:
                        user = _c.sent();
                        reason = !args[3] ? '없음' : args.slice(3).join(' ');
                        console.log(reason);
                        switch (args[0]) {
                            case '부여':
                                if (!user) {
                                    newUser = new warning_1.warning({ id: id, name: name, warning: count });
                                    newUser.save().then(function () {
                                        msg.channel.send('```' + ("\uCC98\uBC8C \uB300\uC0C1: " + name + "#" + discriminator + "\n\uAC00\uD55C \uCC98\uBC8C: \uACBD\uACE0 " + count + "\uD68C\n\uD604\uC7AC \uACBD\uACE0 \uD69F\uC218: " + count + "\uD68C\n\uCC98\uBC8C \uC0AC\uC720: " + reason) + '```').then(function () {
                                            setTimeout(function () { return msg.delete(); }, 2000);
                                        });
                                    });
                                }
                                else {
                                    warning_1.warning.updateOne({ id: id }, { $inc: { warning: count } }, { upsert: true }).then(function () {
                                        msg.channel.send('```' + ("\uCC98\uBC8C \uB300\uC0C1: " + name + "#" + discriminator + "\n\uAC00\uD55C \uCC98\uBC8C: \uACBD\uACE0 " + count + "\uD68C\n\uD604\uC7AC \uACBD\uACE0 \uD69F\uC218: " + (user.warning + count) + "\uD68C\n\uCC98\uBC8C \uC0AC\uC720: " + reason) + '```').then(function () {
                                            setTimeout(function () { return msg.delete(); }, 2000);
                                        });
                                    });
                                }
                                break;
                            case '차감':
                                if (!user || user.warning <= 0)
                                    return [2 /*return*/, msg.reply('이 유저는 차감 할 경고가 없습니다.')];
                                if (user.warning - count < 0)
                                    return [2 /*return*/, msg.reply('차감하려는 경고 수가 유저의 경고 수보다 많습니다.')];
                                warning_1.warning.updateOne({ id: id }, { $inc: { warning: -count } }).then(function () {
                                    msg.channel.send('```' + ("\uCC98\uBC8C \uB300\uC0C1: " + name + "#" + discriminator + "\n\uAC00\uD55C \uCC98\uBC8C: \uACBD\uACE0 \uCC28\uAC10 " + count + "\uD68C\n\uD604\uC7AC \uACBD\uACE0 \uD69F\uC218: " + (user.warning - count) + "\uD68C\n\uCC98\uBC8C \uC0AC\uC720: " + reason) + '```').then(function () {
                                        setTimeout(function () { return msg.delete(); }, 2000);
                                    });
                                });
                                break;
                        }
                        return [2 /*return*/];
                }
            });
        });
    }
};
