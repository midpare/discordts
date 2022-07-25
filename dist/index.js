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
const mongoose_1 = __importDefault(require("mongoose"));
const Client_1 = require("./src/structures/Client");
const glob_1 = require("glob");
const util_1 = require("util");
const client = new Client_1.Client({ intents: 32767 });
const globPromise = (0, util_1.promisify)(glob_1.glob);
(() => __awaiter(void 0, void 0, void 0, function* () {
    const path = yield globPromise(`${__dirname}/src/handler/**/*{.ts,.js}`);
    for (const dir of path) {
        require(dir).default(client);
    }
}))();
const sds = [
    '서울특별시', '부산광역시',
    '대구광역시', '인천광역시',
    '광주광역시', '대전광역시',
    '울산광역시', '세종특별자치시',
    '경기도', '강원도',
    '충청북도', '충청남도',
    '전라북도', '전라남도',
    '경상북도', '경상남도',
    '제주특별자치도'
];
const sdCodes = [
    'B10', 'C10', 'D10',
    'E10', 'F10', 'G10',
    'H10', 'I10', 'J10',
    'K10', 'M10', 'N10',
    'P10', 'Q10', 'R10',
    'S10', 'T10'
];
for (let i = 0; i < sds.length; i++) {
    client.sdCode.set(sds[i], sdCodes[i]);
}
mongoose_1.default.connect(process.env.MONGO_DB_URI + "/discordbot");
client.login();
