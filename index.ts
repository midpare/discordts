import { client } from './contexts/client'

client.start()

setTimeout(() => {
  console.log(client.mainCommands)
}, 5000)