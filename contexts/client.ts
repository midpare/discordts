import { Client, ClientUser, Collection } from 'discord.js'
import { CommandType } from '../typings/command'
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
  sdCode: Collection<string, string> = new Collection()

  constructor() {
    super({ intents: 32767 })
  }

  start() {
    this.login(process.env.TOKEN)
    const handler = new Array('commands', 'interactions', 'events', 'coin', 'school')
    
    handler.forEach((element: string) => {
      require(`${__dirname}/../handler/${element}`)(client)
    })
  }
}

export const client = new ExtendClient()

