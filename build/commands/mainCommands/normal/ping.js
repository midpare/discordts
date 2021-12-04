"use strict";
module.exports = {
    name: 'ping',
    execute: function (_a) {
        var msg = _a.msg, args = _a.args;
        msg.reply('pong!');
    }
};
