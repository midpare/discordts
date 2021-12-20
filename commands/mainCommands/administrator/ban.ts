import { CommandType } from '../../../typings/command'

export = <CommandType> {
  name: 'ban',
  aliases: ['밴', '벤', '차단'],
  category: 'admin',
  use: 'ban <유저> <사유>',
  description: '서버에서 맨션한 <유저>를 차단합니다.',
  execute: ({msg, args}) => {
    if(!msg.member.permissions.has('BAN_MEMBERS')) 
      return msg.reply('이 명령어를 사용할 권한이 없습니다.')
    
    const user = msg.mentions.members?.first()
    const reason = !args[1] ? '없음' : args.slice(1).join(' ')

    if(!user) 
      return msg.reply('차단할 사용자를 맨션해 주시기 바랍니다.')
    if(user.permissions.has('BAN_MEMBERS'))
      return msg.reply('이 사용자는 차단할 수 없습니다.')

    user.ban({ reason })
    msg.channel.send('```' + `처벌 대상: ${user.user.username}#${user.user.discriminator}\n가한 처벌: 차단\n처벌 사유: ${reason}` + '```').then(() => {
      msg.delete()
    })
  }
}