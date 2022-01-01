"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const function_1 = require("../../../handler/function");
const gambling_1 = require("../../../models/gambling");
const client_1 = require("../../../structures/client");
module.exports = {
    name: '풀매도',
    aliases: ['전부판매'],
    category: 'coin',
    execute: ({ msg, args }) => __awaiter(void 0, void 0, void 0, function* () {
        const id = msg.author.id;
        const user = yield gambling_1.gambling.findOne({ id });
        const stock = user.stock;
        const coinName = args[1];
        const userCoin = stock.filter((element) => element.name == coinName)[0];
        const apiOptions = {
            uri: `https://crix-api-endpoint.upbit.com/v1/crix/candles/days/?code=CRIX.UPBIT.${client_1.client.coin.get(coinName)}&count=1&to`,
            method: 'GET',
            json: true
        };
        const coin = yield (0, function_1.requestGet)(apiOptions);
        if (!coinName)
            return msg.reply('판매할 코인을 입력해주시기바랍니다.');
        if (!userCoin)
            return msg.reply('이 코인을 가지고 있지 않습니다.');
        const coinMoney = coin[0].tradePrice;
        const count = userCoin.count;
        const money = coinMoney * count;
        const profit = Math.floor((coinMoney - userCoin.money) * count).toLocaleString();
        const profitShown = money < userCoin.money * count ? profit : '+' + profit;
        const persent = Math.round((coinMoney / userCoin.money - 1) * 100 * 100) / 100;
        const persentShown = persent < 0 ? persent : '+' + persent;
        gambling_1.gambling.updateOne({ id }, { $pull: { stock: userCoin }, $inc: { money: Math.round(money) } }).then(() => {
            msg.reply(`성공적으로 ${coinName} ${count.toLocaleString()}개를 ${money.toLocaleString()}원(개당 ${coinMoney}원)에 판매했습니다!\n손익: ${profitShown}원(${persentShown}%)`);
        });
    })
};
