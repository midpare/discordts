"use strict";
module.exports = {
    name: "clear",
    aliases: ['클리어'],
    execute: function (_a) {
        var msg = _a.msg, args = _a.args;
        var count = parseFloat(args[0]);
        if (!Number.isInteger(count))
            return msg.reply("정확한 자연수를 입력해주시기 바랍니다.\n !clear <숫자>  ");
        if (count < 0 || count > 99)
            return msg.reply("1에서 99사이의 수를 입력해주시기 바랍니다. \n !clear <숫자>");
        msg.channel.bulkDelete(count + 1);
    }
};
