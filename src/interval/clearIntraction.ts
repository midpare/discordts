import { ClientPresence, Message } from "discord.js";
import { Interval } from "../managers/Interval";

export default new Interval({
  execute: async (client) => {
    const baseMessages = client.interactionOptions.map(e => e.messages)
    const messages: Array<Message> = new Array()
    for (const e of baseMessages) {
      for (const m of e) {
        if (!messages.includes(m))
          messages.push(m)
      }
    }

    for (const m of messages) {
      m.delete()
    }
    client.interactionOptions.clear()
  },
  interval: '1m',
  immediate: false,
})