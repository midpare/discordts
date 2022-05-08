"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shuffle = void 0;
function shuffle(arr) {
    for (let i = 0; i < arr.length; i++) {
        const ranIdx = Math.floor(Math.random() * (arr.length - i)) + i;
        const prev = arr[i];
        arr[i] = arr[ranIdx];
        arr[ranIdx] = prev;
    }
    return arr;
}
exports.shuffle = shuffle;
