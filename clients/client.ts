import { Client, Collection } from 'discord.js'
import { CommandType } from '../typings/command'

const client: any = new Client({ intents: 32767 })

client.mainCommands = new Collection()
client.mainAliases = new Collection()
client.subCommands = new Collection()
client.subAliases = new Collection()
client.coin = new Collection()
client.interactions = new Collection()
// client.coin = new Collection()

export default client


class testClient extends Client {
  commands: Collection<string, CommandType> = new Collection()

  constructor() {
    super({ intents: 32767 })
  }
  
}