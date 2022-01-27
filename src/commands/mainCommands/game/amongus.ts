import { VoiceChannel } from "discord.js";
import { Command } from "../../../structures/Commands";
const dead = new Array();
export default new Command({
  name: '어몽어스',
  category: '게임',
  usage: '어몽어스 <시작/종료>',
  description: '어몽어스를 시작하고 종료합니다.',
  execute: ({ msg, args }) => {
    if (!msg.member.permissions.has("MUTE_MEMBERS"))
      return msg.reply('이 명령어를 사용할 권한이 없습니다.');
    const channel = msg.member.voice.channel;
    if (!(channel instanceof VoiceChannel))
      return msg.reply('음성채널에 들어가주시기 바랍니다.');

    const members = Array.from(channel.members.values())
    switch (args[0]) {
      case '시작':
        for (const member of members) {
          if (!member.voice || member.voice.channelId == null || member.user.bot)
            continue;
          member.voice.setMute(true);
        }
        break;
      case '투표':
        for (const member of members) {
          if (!member.voice || member.voice.channelId == null || dead.includes(member))
            continue;
          member.voice.setMute(false);
        }
        break;
      case '사망':
        const user = msg.mentions.members?.first();
        if (!user)
          return msg.reply('유저를 맨션해주시기 바랍니다.');
        dead.push(user);
        if (!user.voice || user.voice.channelId == null || !user.voice.serverDeaf)
          user.voice.setMute(true);
        break;
      case '종료':
        for (const member of members) {
          if (member.voice.channelId == null || dead.includes(member))
            continue;
          member.voice.setMute(false);
        }
        dead.splice(0, dead.length);
        break;
    }
    msg.delete();
  }
})