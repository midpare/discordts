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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = exports.ExtendClient = void 0;
const discord_js_1 = require("discord.js");
const function_1 = require("../handler/function");
const mongoose_1 = __importDefault(require("mongoose"));
class ExtendClient extends discord_js_1.Client {
    constructor() {
        super({ intents: 32767 });
        this.mainAliases = new discord_js_1.Collection();
        this.mainCommands = new discord_js_1.Collection();
        this.subCommands = new discord_js_1.Collection();
        this.subAliases = new discord_js_1.Collection();
        this.coin = new discord_js_1.Collection();
        this.interactions = new discord_js_1.Collection();
        this.sdCode = new discord_js_1.Collection();
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            this.setCoinList();
            this.setSchool();
            const handler = new Array('commands', 'interactions', 'events');
            handler.forEach((element) => {
                require(`${__dirname}/../handler/${element}`)(exports.client);
            });
            yield mongoose_1.default.connect(process.env.DB_URI || '');
            this.login(process.env.TOKEN);
        });
    }
    setCoinList() {
        return __awaiter(this, void 0, void 0, function* () {
            const options = {
                uri: 'https://api.upbit.com/v1/market/all',
                method: 'GET',
                json: true
            };
            const allCoin = yield (0, function_1.requestGet)(options);
            allCoin.forEach((element) => __awaiter(this, void 0, void 0, function* () {
                if (element.market.startsWith('KRW')) {
                    const coinName = element.korean_name;
                    const market = element.market;
                    this.coin.set(coinName, market);
                }
            }));
        });
    }
    setSchool() {
        const sds = ['서울특별시', '부산광역시',
            '대구광역시', '인천광역시',
            '광주광역시', '대전광역시',
            '울산광역시', '세종특별자치시',
            '경기도', '강원도',
            '충청북도', '충청남도',
            '전라북도', '전라남도',
            '경상북도', '경상남도',
            '제주특별자치도'];
        const sdCodes = ['B10', 'C10', 'D10',
            'E10', 'F10', 'G10',
            'H10', 'I10', 'J10',
            'K10', 'M10', 'N10',
            'P10', 'Q10', 'R10',
            'S10', 'T10'];
        for (let i = 0; i < sds.length; i++) {
            exports.client.sdCode.set(sds[i], sdCodes[i]);
        }
    }
}
exports.ExtendClient = ExtendClient;
exports.client = new ExtendClient();
