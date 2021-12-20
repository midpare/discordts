import { CommandType } from '../../../typings/command'

export = <CommandType>{
  name: 'ping',
  category: 'normal',
  use: 'ping',
  description: '봇의 작동가능여부를 확인합니다.',
  execute: ({msg, args}) => {
    msg.reply('pong!')
  }
}
