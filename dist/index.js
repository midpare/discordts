"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const Utils_1 = require("./src/structures/Utils");
const client = new Client_1.Client({ intents: 131071 });
(() => __awaiter(void 0, void 0, void 0, function* () {
    const handlerFiles = new Array();
    Utils_1.Utils.getPath(__dirname + '/src/handler', handlerFiles);
    for (let path of handlerFiles) {
        (yield Promise.resolve().then(() => __importStar(require(path)))).default(client);
    }
    const guilds = Array.from(client.guilds.cache.values());
    for (const guild of guilds) {
        const members = Array.from(guild.members.cache.values());
        const guildId = guild.id;
        for (const member of members) {
            const { id, displayName: name } = member;
            const user = yield client.models.config.findOne({ id });
            if (!user) {
                const newUser = new client.models.config({ id, name, guildId });
                newUser.save();
            }
        }
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
client.login();
mongoose_1.default.connect(process.env.MONGO_DB_URI + "/discordbot");
