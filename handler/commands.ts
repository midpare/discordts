import { glob } from 'glob'
import { promisify } from 'util'
import { ExtendClient } from '../contexts/client'

const globPromise = promisify(glob)

export  = async (client: ExtendClient) => {
  const mainCommandFiles = await globPromise(`${__dirname}/../commands/mainCommands/**/*{.ts,.js}`)

  mainCommandFiles.forEach(async (value) => {
    const file = require(value)
    if (client.mainCommands.get(file.name))
      throw `command name duplicate! command path: ${value}, command name: ${file.name}`
    try {
      client.mainCommands.set(file.name, file)
      if (file.aliases) {
        file.aliases.forEach((element: string) => {
          if (client.mainAliases.get(element))
            throw `command name duplicate! command path: ${value}, command aliases: ${element}`
          client.mainAliases.set(element, file)
        })
      }
    } catch (error) {
      console.log(error)
    }
  })
  const subCommandFiles = await globPromise(`${__dirname}/../commands/subCommands/**/*{.ts,.js}`)
  subCommandFiles.forEach((value) => {
    const file = require(value)
    const commands = new Map()
    const aliases = new Map()
    if (!file.category)
      throw `there is no category in subCommands command path: ${value}`
    commands.set(file.name, file)
    try {
      if (client.subCommands.get(file.category)) {
        if (client.subCommands.get(file.category)?.get(file.name))
          throw `subcommand name duplicate! subcommand path: ${value}, subcommand category: ${file.category}, subcommand name: ${file.name}`
        client.subCommands.get(file.category)?.set(file.name, file)
      } else {
        client.subCommands.set(file.category, commands)
      }

      if (file.aliases) {
        file.aliases.forEach((element: string) => {
          aliases.set(element, file)
          if (client.subAliases.get(file.category)) {
            if (client.subCommands.get(file.category)?.get(element))
              throw `subcommand name duplicate! subcommand path: ${value}, subcommand cateogory: ${file.category}, subcommand name: ${element}`
            client.subAliases.get(file.category)?.set(element, file)
          } else {
            client.subAliases.set(file.category, aliases)
          }
        })
      }
    } catch (error) {
      console.log(error)
    }
  })
}