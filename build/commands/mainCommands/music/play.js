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
var discord_player_1 = require("discord-player");
var player_1 = __importDefault(require("../../../clients/player"));
module.exports = {
    name: 'play',
    aliases: ['p'],
    category: 'music',
    use: 'play <제목>',
    description: '제목의 노래를 현재 음성채널에서 재생합니다.',
    execute: function (_a) {
        var msg = _a.msg, args = _a.args;
        return __awaiter(void 0, void 0, void 0, function () {
            var songTitle, searchResult, queue;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!msg.member.voice.channel)
                            return [2 /*return*/, msg.reply('채널에 접속해주시기 바랍니다.')];
                        songTitle = args.join(' ');
                        if (!args[0])
                            return [2 /*return*/, msg.reply('노래 제목을 입력해주시기 바랍니다.')];
                        return [4 /*yield*/, player_1.default.search(songTitle, {
                                requestedBy: msg.author,
                                searchEngine: discord_player_1.QueryType.AUTO
                            })];
                    case 1:
                        searchResult = _b.sent();
                        queue = player_1.default.createQueue(msg.guild, { metadata: msg.channel });
                        if (!!queue.connection) return [3 /*break*/, 3];
                        return [4 /*yield*/, queue.connect(msg.member.voice.channel)];
                    case 2:
                        _b.sent();
                        _b.label = 3;
                    case 3:
                        searchResult.playlist
                            ? queue.addTracks(searchResult.tracks)
                            : queue.addTrack(searchResult.tracks[0]);
                        if (!!queue.playing) return [3 /*break*/, 5];
                        return [4 /*yield*/, queue.play()];
                    case 4:
                        _b.sent();
                        msg.reply(searchResult.tracks[0] + "\uC744(\uB97C) " + msg.member.voice.channel.name + "\uC5D0\uC11C \uC7AC\uC0DD\uD569\uB2C8\uB2E4!");
                        return [3 /*break*/, 6];
                    case 5:
                        msg.reply(searchResult.tracks[0] + "\uC744(\uB97C) \uB9AC\uC2A4\uD2B8\uC5D0 \uCD94\uAC00\uD569\uB2C8\uB2E4!");
                        _b.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        });
    }
};
