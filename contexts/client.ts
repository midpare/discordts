import { Client, ClientUser, Collection } from 'discord.js'
import { CommandType } from '../typings/command'
import { InteractionType } from '../typings/interaction'
import { requestGet } from '../handler/function'
import mongoose from 'mongoose'

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
    const handler = new Array('commands', 'interactions', 'events')
    handler.forEach((element: string) => {
      require(`${__dirname}/../handler/${element}`)(client)
    })

    this.setCoinList()
    this.setSchool()

    mongoose.connect(process.env.DB_URI || '')

    this.login(process.env.TOKEN)
  }

  async setCoinList() {
    const options = {
      uri: 'https://api.upbit.com/v1/market/all',
      method: 'GET',
      json: true
    }
    const allCoin = await requestGet(options)
    allCoin.forEach(async (element: { market: string; korean_name: string }) => {
      if (element.market.startsWith('KRW')) {
        const coinName = element.korean_name
        const market = element.market
        this.coin.set(coinName, market)
      }
    })
  }

  async setSchool() {
    const sds = ['서울특별시', '부산광역시',
      '대구광역시', '인천광역시',
      '광주광역시', '대전광역시',
      '울산광역시', '세종특별자치시',
      '경기도', '강원도',
      '충청북도', '충청남도',
      '전라북도', '전라남도',
      '경상북도', '경상남도',
      '제주특별자치도']
    const sdCodes = ['B10', 'C10', 'D10',
      'E10', 'F10', 'G10',
      'H10', 'I10', 'J10',
      'K10', 'M10', 'N10',
      'P10', 'Q10', 'R10',
      'S10', 'T10']
    for (let i = 0; i < sds.length; i++) {
      client.sdCode.set(sds[i], sdCodes[i])
    }
  }
}

export const client = new ExtendClient()

