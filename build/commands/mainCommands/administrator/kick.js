"use strict";
module.exports = {
    name: 'kick',
    aliases: ['킥', '강퇴'],
    category: 'admin',
    use: 'kick <유저> <사유>',
    description: '서버에서 맨션한 <유저>를 강퇴합니다.',
    execute: function (_a) {
        var _b;
        var msg = _a.msg, args = _a.args;
        if (!msg.member.permissions.has('KICK_MEMBERS'))
            return msg.reply('이 명령어를 사용할 권한이 없습니다.');
        var user = (_b = msg.mentions.members) === null || _b === void 0 ? void 0 : _b.first();
        var reason = !args[1] ? '없음' : args.slice(1).join(' ');
        if (!user)
            return msg.reply('강퇴할 사용자를 맨션해 주시기 바랍니다.');
        if (user.permissions.has('KICK_MEMBERS'))
            return msg.reply('이 사용자는 강퇴할 수 없습니다.');
        user.kick(reason);
        msg.channel.send('```' + ("\uCC98\uBC8C \uB300\uC0C1: " + user.user.username + "#" + user.user.discriminator + "\n\uAC00\uD55C \uCC98\uBC8C: \uAC15\uD1F4 \n\uCC98\uBC8C \uC0AC\uC720: " + reason) + '```').then(function () {
            msg.delete();
        });
    }
};
