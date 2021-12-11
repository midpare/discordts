import { glob } from 'glob'
import { promisify } from 'util'
import client from '../../../clients/client'
import { commandType } from '../../../typings/command'

const globPromise = promisify(glob)

export = <commandType> {
  name: 'help',
  aliases: ['도움말'],
  category: 'normal',
  use: 'help',
  description: '도움말 확인',
  execute: async ({msg, args}) => { 
    // const directory: string[] = Array.from(new Set(client.mainCommands.map((cmd: commandType) => cmd.category)))
    
    // const category = directory.map((dir: string) => {
    //   const commands = client.mainCommands
    //   .filter((cmd: commandType) => cmd.category == dir)
    //   .map((cmd: commandType) => {
    //     return {
    //       name: cmd.use,
    //       description: cmd.description
    //     }
    //   })
    //   return {
    //     category: dir,
    //     commands
    //   }
    // })
    const directory = await globPromise(`${__dirname}/../commands/**/*{.ts,.js}`)
    console.log(directory)
  } 
}