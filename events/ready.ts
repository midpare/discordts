import { client } from "../context/client"

export = {
  name: 'ready',
  event : () => {
    client.user.setActivity('개발')
    console.log(`Logged in as ${client.user.tag}!`)
  }
}