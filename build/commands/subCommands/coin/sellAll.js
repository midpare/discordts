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
const gambling_1 = require("../../../models/gambling");
const function_1 = require("../../../handler/function");
const client_1 = require("../../../contexts/client");
module.exports = {
    name: '풀매수',
    aliases: ['전부구매'],
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
            return msg.reply('정확한 코인을 입력해주시기바랍니다.');
        const coinMoney = coin[0].tradePrice;
        const count = Math.floor(user.money / coinMoney);
        const money = coinMoney * count;
        if (userCoin) {
            const moneyAve = (userCoin.money * userCoin.count + money) / (userCoin.count + count);
            gambling_1.gambling.updateOne({ id, stock: userCoin }, { $set: { 'stock.$.money': moneyAve }, $inc: { 'stock.$.count': count, money: Math.round(-money) } }).then(() => {
                msg.reply(`성공적으로 ${coinName} ${count.toLocaleString()}개를 ${money.toLocaleString()}원(개당 ${coinMoney.toLocaleString()}원)에 추가로 구매했습니다!\n현재 평단가: ${userCoin.money.toLocaleString()}원 -> ${(Math.floor(moneyAve * 100) / 100).toLocaleString()}원\n현재 구매량: ${userCoin.count}개 -> ${(userCoin.count + count).toLocaleString()}개`);
            });
        }
        else {
            const stockObject = {
                name: coinName,
                count: count,
                money: coinMoney
            };
            gambling_1.gambling.updateOne({ id }, { $push: { stock: stockObject }, $inc: { money: Math.round(-money) } }).then(() => {
                msg.reply(`성공적으로 ${coinName} ${count.toLocaleString()}개를 ${(money).toLocaleString()}원(개당 ${coinMoney.toLocaleString()}원)에 구매했습니다!`);
            });
        }
    })
};
