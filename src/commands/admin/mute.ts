import { Command } from "../../structures/Commands";
import ms from 'ms'
import { TextChannel } from "discord.js";

export default new Command({
  name: 'mute',
  aliases: ['뮤트', '채팅 차단'],
  category: '관리자',
  usage: 'mute <유저> <시간> [사유]',
  description: '<유저>의 채팅을 <시간>만큼 차단합니다.',
  execute: ({ msg, args, client }) => {
    if (msg.member?.permissions.has("MANAGE_CHANNELS"))
      return msg.reply('이 명령어를 사용할 권한이 없습니다.');

    const channel = <TextChannel>client.channels.cache.get('910521119877005363');  
    const target = msg.mentions.members?.first();
    const mute = msg.guild?.roles.cache.get('959778424505892875')

    if (!target)
      return msg.reply('채팅을 차단할 유저를 맨션해주시기 바랍니다.');
    
    const roles = target.roles;
    const targetRole = roles.cache.first();

    if (!args[1] || !ms(args[1]))
      return msg.reply('정확한 시간을 입력해주시기 바랍니다.\n예) 10h: 10시간, 50m: 50분');
  
    
  },
});