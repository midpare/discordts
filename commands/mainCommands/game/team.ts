import { MessageEmbed } from "discord.js"
import { commandType } from '../../../typings/command'

export = <commandType> {
    name : "팀",
    execute: ({msg, args}) => {
      const embed = new MessageEmbed()
      .setTitle("팀")
      if(!args[0]) 
        return msg.reply("기입할 이름을 입력해주세요")
      const team = new Array()

      for (let i = 0; i < args.length/2; i++) {
        const random = Math.round(Math.random() * args.length)
        team.push(args[random])
        args.splice(random, 1)
      }

      team.forEach((element) => {
        embed.addField('1팀', `${element}`, false)
      })

      args.forEach((element) => {
        embed.addField('2팀', `${element}`, false)
      })
    
      msg.channel.send({ embeds: [embed] })
    }
}