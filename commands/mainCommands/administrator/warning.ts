import { warning } from '../../../models/warning'
import { CommandType } from '../../../typings/command'

export = <CommandType>{
  name: '경고',
  category: 'admin',
  use: '경고',
  description: '서버에서 맨션한 유저에게 경고를 부여합니다.',
  execute: async ({ msg, args }) => {
    if (!msg.member.roles.cache.has('910521119713394745') && !msg.member.roles.cache.has('910521119713394744'))
      return msg.reply('이 명령어는 부방장 이상만 사용 가능합니다.')

    const target = msg.mentions.members?.first()
    const count = parseFloat(args[2])

    if (!target)
      return msg.reply('맨션을 해 유저를 선택해주시기바랍니다..\n!경고 <부여/차감> <유저> <경고횟수> [사유]').then(() => {
        setTimeout(() => msg.channel.bulkDelete(2), 2000)
      })
    if (count <= 0 || !Number.isInteger(count))
      return msg.reply('정확한 자연수를 입력해주시기바랍니다.\n!경고 <부여/차감> <유저> <경고횟수> [사유]').then(() => {
        setTimeout(() => msg.channel.bulkDelete(2), 2000)
      })

    if (count > 10)
      return msg.reply('10회를 초과하는 경고는 부여/차감하실 수 없습니다.\n!경고 <부여/차감> <유저> <경고횟수> [사유]').then(() => {
        setTimeout(() => msg.channel.bulkDelete(2), 2000)
      })

    const id = target.id
    const discriminator = target.user.discriminator
    const name = target.user.username
    const user = await warning.findOne({ id })

    const reason = !args[3] ? '없음' : args.slice(3).join(' ')

    switch (args[0]) {
      case '부여':
        if (!user) {
          const newUser = new warning({ id, name, warning: count })
          newUser.save()
          msg.channel.send('```' + `처벌 대상: ${name}#${discriminator}\n가한 처벌: 경고 ${count}회\n현재 경고 횟수: ${count}회\n처벌 사유: ${reason}` + '```').then(() => {
            setTimeout(() => msg.delete(), 2000)
          })
        } else {
          (await warning.updateOne({ id }, { $inc: { warning: count } }, { upsert: true })).matchedCount
          msg.channel.send('```' + `처벌 대상: ${name}#${discriminator}\n가한 처벌: 경고 ${count}회\n현재 경고 횟수: ${user.warning + count}회\n처벌 사유: ${reason}` + '```').then(() => {
            setTimeout(() => msg.delete(), 2000)
          })
        }
        break
      case '차감':
        if (!user || user.warning <= 0)
          return msg.reply('이 유저는 차감 할 경고가 없습니다.')

        if (user.warning - count < 0)
          return msg.reply('차감하려는 경고 수가 유저의 경고 수보다 많습니다.');

        (await warning.updateOne({ id }, { $inc: { warning: -count } })).matchedCount
        msg.channel.send('```' + `처벌 대상: ${name}#${discriminator}\n가한 처벌: 경고 차감 ${count}회\n현재 경고 횟수: ${user.warning - count}회\n처벌 사유: ${reason}` + '```').then(() => {
          setTimeout(() => msg.delete(), 2000)
        })
        break
    }
  }
}   