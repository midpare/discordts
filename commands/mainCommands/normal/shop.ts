import { MessageEmbed } from 'discord.js'
import { gambling } from '../../../models/gambling'
import { commandType } from '../../../typings/command'

export = <commandType> {
  name: "상점",
  category: 'normal',
  use: '상점 <구매/판매> <물품>',
  description: '상점에서 물품을 구매하거나 판매합니다.',
  execute: async ({msg, args}) => {
    const embed = new MessageEmbed()
    const id  = msg.author.id
    const user = await gambling.findOne({id})
    if (!user)
      return msg.reply("가입되지 않은 유저입니다 !가입 을 통해 가입해주시기 바랍니다.")

    switch(args[0]) {
      default :
        embed
        .setTitle("상점")
        .setDescription("!상점 구매 <이름>으로 구매하실 수 있습니다")
        .addFields(
          {name: "도박권 가위바위보", value: "가위바위보 도박을 할 수 있는 도박권을 구매합니다. \n가격: 30만원", inline: false},
          {name: "베팅권", value: "베팅을 시작하고 종료할 수있는 권한을 구매합니다. \n가격: 150만원", inline: false},
          {name: "부방장", value: "부방장이 될 수 있는 권한을 구매합니다. \n가격: 10억", inline: false},
        )
        msg.channel.send({embeds: [embed]})
        break
      case "구매" :
        switch(args[1]) {
          case "도박권" :
            switch(args[2]) {
              case "가위바위보" :
                if (user.gamLevel % 2 == 0)
                  return msg.reply("이미 이 도박권을 구매한 유저입니다.")

                if (user.money < 300000)
                  return msg.reply("이 도박권을 살 충분한 돈을 보유하고 있지 않습니다.")
                
                gambling.updateOne({id}, {$inc: {money: -300000}, $mul: {gamLevel: 2}})
                .then(() => msg.reply("성공적으로 가위바위보 도박권을 구매했습니다!"))
                break
            }
            break 
          case "베팅권" :
            if (user.gamLevel % 3 == 0)
              return msg.reply('이미 이 베팅권을 구매한 유저입니다.')
            if (user.money < 1500000)
              return msg.reply("이 권한을 살 충분한 돈을 보유하고 있지 않습니다.")
          
            gambling.updateOne({id}, {$inc: {money: -1500000}, $mul: {gamLevel: 3}})
            break
        }
      break
    }
  }
}