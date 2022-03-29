"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findBot = void 0;
function findBot(users) {
    for (const user of users) {
        if (user.user.bot)
            return true;
    }
    return false;
}
exports.findBot = findBot;
