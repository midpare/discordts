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
exports.xor = exports.shuffle = exports.requestGet = exports.dateCal = void 0;
const request_1 = __importDefault(require("request"));
function dateCal(date, days) {
    const dateVariable = new Date(date);
    dateVariable.setDate(date.getDate() + days);
    const dateText = dateVariable.toString().split(/ +/);
    const monthArr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const findMonth = monthArr.find(element => element == dateText[1]);
    let monthName;
    if (findMonth != undefined)
        monthName = findMonth;
    else
        monthName = '';
    const monthIndex = monthArr.indexOf(monthName) + 1;
    const month = monthIndex >= 10 ? monthIndex.toString() : '0' + monthIndex.toString();
    const day = dateText[3] + month + dateText[2];
    return day;
}
exports.dateCal = dateCal;
function requestGet(option) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            (0, request_1.default)(option, (err, res, body) => {
                if (err)
                    reject(err);
                else
                    resolve(body);
            });
        });
    });
}
exports.requestGet = requestGet;
function shuffle(arr) {
    const shuffleArr = new Array();
    while (arr.length) {
        const roll = Math.floor(Math.random() * arr.length);
        shuffleArr.push(arr.splice(roll, 1)[0]);
    }
    return shuffleArr;
}
exports.shuffle = shuffle;
function xor(a, b) {
    return ((a || b) && !(a && b));
}
exports.xor = xor;
