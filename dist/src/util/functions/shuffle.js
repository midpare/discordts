"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shuffle = void 0;
function shuffle(arr) {
    const shuffleArr = new Array();
    while (arr.length) {
        const roll = Math.floor(Math.random() * arr.length);
        shuffleArr.push(arr.splice(roll, 1)[0]);
    }
    return shuffleArr;
}
exports.shuffle = shuffle;
