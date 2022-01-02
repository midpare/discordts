import { CommandType } from '../../../typings/command'

export = <CommandType> {
  name: 'kick',
  aliases: ['킥', '강퇴'],
  category: 'admin',
  usage: 'kick <유저> <사유>',
  description: '서버에서 맨션한 <유저>를 강퇴합니다.',
  execute: async ({msg, args}) => {
    if(!msg.member.permissions.has('KICK_MEMBERS')) 
      return msg.reply('이 명령어를 사용할 권한이 없습니다.')
    
    const user = msg.mentions.members?.first()
    const reason = !args[1] ? '없음' : args.slice(1).join(' ')

    if(!user) 
      return msg.reply('강퇴할 사용자를 맨션해 주시기 바랍니다.')
    if(user.permissions.has('KICK_MEMBERS'))
      return msg.reply('이 사용자는 강퇴할 수 없습니다.')

    user.kick(reason)
    msg.channel.send('```' + `처벌 대상: ${user.user.username}#${user.user.discriminator}\n가한 처벌: 강퇴 \n처벌 사유: ${reason}` + '```').then(() => {
      msg.delete()
    })
  }
}