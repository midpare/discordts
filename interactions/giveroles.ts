import { interactionType } from "../typings/interaction";
import client from '../clients/client'

export = <interactionType> {
  name: 'giveRole',
  execute: (interaction) => {
    interaction.member.roles.add('910521119713394743')
    interaction.member.roles.remove('910521119713394739')
    interaction.channel.send('성공적으로 역할을 지급받았습니다!').then(() => {
      setTimeout(() => interaction.channel.bulkDelete(1), 2000);
    })
    client.channels.cache.get('910521192039989288').send(`${interaction.user.username}#${interaction.user.discriminator}님이 서버에 입장하였습니다!`)
  }
}