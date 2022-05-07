import { requestGet } from '../util/functions/requestGet';
import { Interval } from '../managers/Interval';

export default new Interval({
  execute: async (client) => {
    const options = {
      uri: 'https://api.upbit.com/v1/market/all',
      method: 'GET',
      json: true,
    };
    const allCoin = await requestGet(options);

    for (const coin of allCoin) {
      if (coin.market.startsWith('KRW')) {
        const coinName = coin.korean_name;
        const market = coin.market;
        client.coin.set(coinName, market);
      }
    }
  },
  interval: '1d',
  immediate: true,
});
