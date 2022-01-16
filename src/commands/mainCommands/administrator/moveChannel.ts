import { TextBasedChannel, VoiceChannel } from 'discord.js';
import { Command } from '../../../structures/Commands';

export default new Command({
  name: '이동',
  category: '관리자',
  usage: '이동 <유저/채널> <맨션> <채널>',
  description: '맨션한 유저나 맨션한 채널에 있는 유저를 다른 채널로 이동시킵니다.',
  execute: async ({ msg, args }) => {
    if (!msg.member.permissions.has('MOVE_MEMBERS'))
      return msg.reply('이 명령어를 사용할 권한이 없습니다.');

    const channels: Array<VoiceChannel | TextBasedChannel> = Array.from(msg.mentions.channels.values() || [])
    const users = new Array();
    switch (args[0]) {
      case '유저':
        const targetUsers = Array.from(msg.mentions.members?.values() || []);
        const userTargetChannel = channels[0];

        if (!targetUsers[0])
          return msg.reply('이동할 유저를 맨션해주시기 바랍니다.');

        if (!userTargetChannel || !userTargetChannel.isVoice())
          return msg.reply('음성채널을 맨션해주시기 바랍니다.');

        for (const user of targetUsers) {
          if (user.voice.channelId == null)
            continue;
          user.voice.setChannel(userTargetChannel);
          users.push(user.user.username);
        }
        
        users.length > 3 ? msg.reply(`성공적으로 ${users[0]}님 외 ${(users.length - 1).toLocaleString()}명이 ${userTargetChannel.name}채널로 이동했습니다!`) : msg.reply(`성공적으로 ${users.join(', ')}님이 ${userTargetChannel.name}채널로 이동했습니다!`);
        break;
      case '채널':
        const channelTargetChannel = channels[0]
        if (!channelTargetChannel || !channelTargetChannel.isVoice())
          return msg.reply('음성채널을 맨션해주시기 바랍니다.');

        const members = channelTargetChannel.members;
        if (!members?.first())
          return msg.reply('이 채널에는 이동할 유저가 없습니다.');

        const movedChannel = channels[1]
        if (!movedChannel || !movedChannel.isVoice())
          return msg.reply('이동할 정확한 채널을 선택해주시기 바랍니다.');

        for (const user of members.values()) {
          user.voice.setChannel(movedChannel);
          users.push(user.user.username);
        }
        users.length > 3 ? msg.reply(`성공적으로 ${users[0]}님 외 ${(users.length - 1).toLocaleString()}명이 ${channelTargetChannel.name}채널로 이동했습니다!`) : msg.reply(`성공적으로 ${users.join(', ')}님이 ${channelTargetChannel.name}채널로 이동했습니다!`);
        break;
      default:
        return msg.reply('유저/채널 중 선택해주시기 바랍니다.');
    }
  },
});


