import { ChannelManager, Client, ClientUser, Collection } from 'discord.js'
import { CommandType } from '../typings/command'
import mongoose from 'mongoose'
import 'dotenv/config'
import { InteractionType } from '../typings/interaction'

export class ExtendClient extends Client {
  public user!: ClientUser
  public channels!: any
  
  mainCommands: Collection<string, CommandType> = new Collection()
  mainAliases: Collection<string, CommandType> = new Collection()
  subCommands: Collection<string, Map<string, CommandType>> = new Collection()
  subAliases: Collection<string, Map<string, CommandType>> = new Collection()
  coin: Collection<string, string> = new Collection()
  interactions: Collection<string, InteractionType> = new Collection()

  constructor() {
    super({ intents: 32767 })
  }

  start() {
    mongoose.connect(process.env.DB_URI || '')
    this.login('OTAyNzk0ODQ1MjE3NzU1MjM3.YXjnOA.aM8lmJ_Hjut46LDprRh4m9qugp4')
    const handler = new Array('commands', 'interactions', 'events', 'coinList')

    handler.forEach((element: string) => {
      require(`${__dirname}/../handler/${element}`)(client)
    })
  }
}

export const client = new ExtendClient()

