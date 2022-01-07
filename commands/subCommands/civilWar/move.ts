import { client } from "../../../structures/Client";
import { Command } from "../../../structures/Commands";
import { civilWar } from "../../../structures/game/CivilWar";

export default new Command({
  name: '이동',
  category: '내전',
  usage: '이동',
  description: '팀을 나눈 유저들을 내전방으로 이동시킵니다.',
  execute: async ({ msg, args }) => {
    if (!civilWar.team1[0])
      return msg.reply('이동할 멤버가 없습니다.');
    const team1 = civilWar.team1
    const team2 = civilWar.team2

    const channel1 = client.channels.cache.get('910521120158019624');
    const channel2 = client.channels.cache.get('910521120158019625');

    console.log(team1)
    console.log(team2)
    for (const team1User of team1) {
      if (!team1User.voice || team1User.voice.channelId == null)
        continue;
      team1User.voice.setChannel(channel1);
      console.log(team1User.voice)
    }

    for (const team2User of team2) {
      if (!team2User.voice || team2User.voice.channelId == null)
        continue;
      team2User.voice.setChannel(channel2);
    }
  },
});