import { Message } from 'discord.js'
import { commandType } from '../../../typings/command'

export = <commandType>{
  name: 'ping',
  execute: ({msg, args}) => {
    msg.reply('pong!')
  }
}
