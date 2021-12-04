import client from './clients/client'
import mongoose from 'mongoose'
import 'dotenv/config'

const handler = new Array('commands', 'interactions', 'events', 'coinList')

handler.forEach((element: string) => {
  require(`${__dirname}/handler/${element}`)(client)
})


mongoose.connect(process.env.DB_URI || '')
client.login(process.env.TOKEN)
