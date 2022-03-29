"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dateCal = void 0;
function dateCal(date, days) {
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
exports.dateCal = dateCal;
