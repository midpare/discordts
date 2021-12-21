import { ExtendClient } from "../clients/client"
import { requestGet } from "./function"
export = async (client: ExtendClient) => {
  const options = {
    uri: 'https://api.upbit.com/v1/market/all'
  }
  const allCoin: any = await requestGet(options)
  allCoin.forEach(async (element: { market: string; korean_name: string }) => {
    if (element.market.startsWith('KRW')) {
      const coinName = element.korean_name
      const market = element.market
      client.coin.set(coinName, market)
    }
  })
}