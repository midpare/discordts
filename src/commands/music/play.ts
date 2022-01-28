import { QueryType } from 'discord-player';
import player from '../../structures/Player';
import { Command } from '../../structures/Commands';
import { findBot } from '../../util/Util';


export default new Command({
  name: 'play',
  aliases: ['p'],
  category: '노래',
  usage: 'play <제목>',
  description: '제목의 노래를 현재 음성채널에서 재생합니다.',
  execute: async ({ msg, args }) => {
    const channel = msg.member.voice.channel;
    if (!channel)
      return msg.reply('채널에 접속해주시기 바랍니다.');

    if (!args[0])
      return msg.reply('노래 제목을 입력해주시기 바랍니다.');
    const songTitle = args.join(' ');

    const searchResult = await player.search(songTitle, {
      requestedBy: msg.author,
      searchEngine: QueryType.YOUTUBE_SEARCH,
    });

    const members = Array.from(channel.members.values());
    const queue = player.createQueue(msg.guild, { metadata: msg.channel });
    if (!findBot(members)) {
      await queue.connect(channel);
    }

    queue.addTrack(searchResult.tracks[0]);

    if (!queue.playing) {
      await queue.play();
      msg.reply(`${searchResult.tracks[0]}을(를) ${channel.name}에서 재생합니다!`);
    } else {
      msg.reply(`${searchResult.tracks[0]}을(를) 리스트에 추가합니다!`);
    }
  },
});
