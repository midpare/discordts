import { VoiceChannel } from "discord.js";
import { client } from "../../../structures/Client";
import { Command } from "../../../structures/Commands";

export default new Command({
  name: '알람',
  category: 'administrator',
  usage: '알람 <유저>',
  description: '헤드셋과 마이크를 모두 끈 유저를 여러번 이동시킵니다.',
  execute: async ({ msg, args }) => {
    if (!msg.member.permissions.has('MOVE_MEMBERS'))
      return msg.reply('당신은 명령어를 사용할 권한이 없습니다.');
    const target = msg.mentions.members?.first();
    if (!target)
      return msg.reply('이동할 유저를 맨션해주시기바랍니다.');

    if (target.voice.channelId == null)
      return msg.reply('이 유저는 음성채널에 접속해있지 않습니다.');

    if (!target.voice.selfDeaf && !target.voice.serverDeaf)
      return msg.reply('이 유저는 헤드셋을 끄고있지 않습니다.');

    const previousChannel = target.voice.channel;
    const nextChannel = <VoiceChannel>client.channels.cache.get('910521120770359323')

    let time = false;

    await target.voice.setChannel(nextChannel);
    
    const previousInterval = setInterval(() => {
      target.voice.setChannel(previousChannel);
    }, 500);

    const nextInterval = setInterval(() => {
      target.voice.setChannel(nextChannel);
    }, 500);

    setTimeout(() => {
      clearInterval(previousInterval);
      clearInterval(nextInterval);
      target.voice.setChannel(previousChannel);
    }, 5000);
  }
})