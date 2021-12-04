import { Client, Collection } from 'discord.js'

const client: any = new Client({ intents: 32767 })

client.mainCommands = new Collection()
client.mainAliases = new Collection()
client.subCommands = new Collection()
client.subAliases = new Collection()
client.interactions = new Collection()
client.coin = new Collection()
export default client