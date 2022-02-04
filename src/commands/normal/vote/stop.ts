import { client } from "../../../structures/Client";
import { Command } from "../../../structures/Commands";

export default new Command({
  name: '투표 종료',
  category: '기본',
  usage: '투표 종료',
  description: '자신이 시작한 투표를 종료합니다.',
  execute: ({ msg, args }) => {
    if (!client.vote.get(msg.author.id))
      return msg.reply(`${msg.author.username}님이 시작한 투표가 없습니다`);
    
    
  }
})