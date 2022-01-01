import { CommandType } from "../../../typings/command";
import { bet1, bet2, betting } from '../../../structures/betting'
import { MessageEmbed } from "discord.js";

export = <CommandType> {
  name: '시작',
  aliases: ['스타트'],
  category: 'betting',
  execute: async ({msg, args}) => {
    if (betting.betting)
      return msg.reply('이미 시작한 베팅이 있습니다.')

    if (!args[1])
      return msg.reply('제목을 입력해주시기바랍니다.')

    if(!args[2] || !args[3])
      return msg.reply('베팅 이름을 입력해주시기바랍니다.')

    const embed = new MessageEmbed()
    betting.title = args[1]
    bet1.name = args[2]
    bet2.name = args[3]
    
    embed
    .setTitle(betting.title)
    .setDescription(`${bet1.name}와 ${bet2.name}중 베팅해주시기바랍니다.`)
    .addFields(
      {name : `${bet1.name}`, value: `!베팅 ${bet1.name} 로 베팅해주시기바랍니다.`, inline : true},
      {name : `${bet2.name}`, value: `!베팅 ${bet2.name} 로 베팅해주시기바랍니다.`, inline : true}
    )
    msg.channel.send({embeds: [embed]})
    betting.betting = true 
  }
}