import { ExtendClient } from "../context/client"
import { requestGet } from "./function"
export = async (client: ExtendClient) => {
  const options = {
    uri: 'https://api.upbit.com/v1/market/all',
    method:'GET',
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
}