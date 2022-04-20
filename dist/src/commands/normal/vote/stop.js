"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Commands_1 = require("../../../structures/Commands");
exports.default = new Commands_1.Command({
    name: '투표 종료',
    category: '기본',
    usage: '투표 종료',
    description: '자신이 시작한 투표를 종료합니다.',
    execute: ({ msg, args, client }) => {
        const vote = client.vote.get(msg.channelId);
        if (!vote)
            return msg.reply(`이 채널에 시작한 투표가 없습니다`);
        if (vote.starter != msg.author.id)
            return msg.reply(`이 투표는 ${msg.author.username}님이 시작한 투표가 아닙니다.`);
        vote.collector.stop();
    }
});
