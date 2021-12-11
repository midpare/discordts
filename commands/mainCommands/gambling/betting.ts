import { commandType } from "../../../typings/command";
import { bet1, bet2, betting } from "../../../typings/betting";
import { gambling } from "../../../models/gambling";
import client from "../../../clients/client";

export = <commandType> {
  name: '베팅',
  category: 'gambling',
  use: '베팅',
  description: '베팅을 합니다.',
  execute: async ({msg, args}) => {
    const id = msg.author.id
    const command = client.subCommands.get('betting').get(args[0])
    const alias = client.subAliases.get('betting').get(args[0])
    if (command) {
      command.execute({msg, args})
      return
    } else if (alias) {
      alias.execute(msg, {args})
      return
    }
    if (!betting.betting)
      return msg.reply('아직 베팅을 시작하지 않았습니다.')
    if(args[0] != bet1.name && args[0] != bet2.name)
      return

    const money = parseFloat(args[1])
  
    if(!Number.isInteger(money))
      return msg.reply('정확한 자연수를 입력해주시기바랍니다.') 
  

    switch(args[0]) {
      case bet1.name :
        bettingFunction(bet1)
        break
      case bet2.name :
        bettingFunction(bet2)
        break
    }

    async function bettingFunction (bet: any) {
      const user = await gambling.findOne({id})

      if (money > user.money)
        return msg.reply(`자신의 돈보다 많은돈은 입력해실 수 없습니다. \n현재잔액: ${user.money.toLocaleString()}원`)

      const posArray = bet.list.filter((item: {id: string}) => item.id === user.id)
      function posFunction(element: {id: string}) {
        if (element.id === user.id)
          return true
      }

      if (posArray.length <= 0) {
        bet.list.push({id: user.id, money: money})
        gambling.updateOne({id}, {$inc: {money: -money}})
          .then(() => msg.reply(`${user.name}님이 "${bet.name}"에 ${money.toLocaleString()}원을 베팅했습니다! \n현재잔액 ${user.money.toLocaleString()}원 -> ${(user.money - money).toLocaleString()}원`))
        bet.moneyBefore = money
      } else {
        const arr = bet.list.findIndex(posFunction)

        if (bet.list[arr].money + money < 0)
          return msg.reply(`베팅액보다 큰 금액을 뺄 수는 없습니다 \n현재 베팅액: ${bet.list[arr].money.toLocaleString()}`)

        bet.list.splice(arr, 1, {id: user.id, money: bet.moneyBefore + money})
        gambling.updateOne({id}, {$inc: {money: -money}})
          .then(() => msg.reply(`${user.name}님이 "${bet.name}"에 ${money.toLocaleString()}원을 추가로 베팅했습니다! \n현재 베팅액: ${(bet.list[arr].money - money).toLocaleString()}원 -> ${bet.list[arr].money.toLocaleString()}원 \n현재잔액 ${user.money.toLocaleString()}원 -> ${(user.money - money).toLocaleString()}원`))
          
        bet.moneyBefore = bet.list[arr].money
      }
    }
  }
}