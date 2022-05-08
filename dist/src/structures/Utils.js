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
exports.Utils = void 0;
const request_1 = __importDefault(require("request"));
class Utils {
    static dateCal(date, days) {
        const dateVariable = new Date(date);
        dateVariable.setDate(date.getDate() + days);
        const dateText = dateVariable.toString().split(/ +/);
        const monthArr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const findMonth = monthArr.find(element => element == dateText[1]);
        const monthName = findMonth != undefined ? findMonth : '';
        const monthIndex = monthArr.indexOf(monthName) + 1;
        const month = monthIndex >= 10 ? monthIndex.toString() : '0' + monthIndex.toString();
        const day = dateText[3] + month + dateText[2];
        return day;
    }
    static findBot(users) {
        for (const user of users) {
            if (user.user.bot)
                return true;
        }
        return false;
    }
    static requestGet(option) {
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
    static shuffle(arr) {
        for (let i = 0; i < arr.length; i++) {
            const ranIdx = Math.floor(Math.random() * (arr.length - i)) + i;
            const prev = arr[i];
            arr[i] = arr[ranIdx];
            arr[ranIdx] = prev;
        }
        return arr;
    }
}
exports.Utils = Utils;
