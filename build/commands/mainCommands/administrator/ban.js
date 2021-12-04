"use strict";
module.exports = {
    name: 'ban',
    aliases: ['밴', '벤', '차단'],
    execute: function (_a) {
        var _b;
        var msg = _a.msg, args = _a.args;
        if (!msg.member.permissions.has('BAN_MEMBERS'))
            return msg.reply('이 명령어를 사용할 권한이 없습니다.');
        var user = (_b = msg.mentions.members) === null || _b === void 0 ? void 0 : _b.first();
        var reason = !args[1] ? '없음' : args.slice(1).join(' ');
        if (!user)
            return msg.reply('차단할 사용자를 맨션해 주시기 바랍니다.');
        if (user.permissions.has('BAN_MEMBERS'))
            return msg.reply('이 사용자는 차단할 수 없습니다.');
        user.ban({ reason: reason });
        msg.channel.send('```' + ("\uCC98\uBC8C \uB300\uC0C1: " + user.user.username + "#" + user.user.discriminator + "\n\uAC00\uD55C \uCC98\uBC8C: \uCC28\uB2E8\n\uCC98\uBC8C \uC0AC\uC720: " + reason) + '```').then(function () {
            msg.delete();
        });
    }
};
