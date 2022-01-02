import { requestGet } from "../handler/function"
import { client } from "../contexts/client"
import { IntervalType } from "../typings/interval"

export = <IntervalType> {
  execute: async () => {
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
        client.coin.set(coinName, market)
      }
    }) 
  },
  interval: '1d',
  immediate: true
}
