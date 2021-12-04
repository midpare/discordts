import { commandType } from "../../../typings/command";
import { MessageActionRow, MessageButton } from "discord.js";

export = <commandType> {
  name: '현황',
  aliases: ['시세', '가격'],
  category: 'coin',
  execute: ({msg, args}) => {
    const coinRow = new MessageActionRow().addComponents(
      new MessageButton()
        .setURL('https://upbit.com/exchange')
        .setStyle('LINK')
        .setLabel('거래소')
    )
    msg.channel.send({ content: '이곳을 눌러 현황을 확인하세요', components: [coinRow] })
  }
}