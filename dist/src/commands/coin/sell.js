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
Object.defineProperty(exports, "__esModule", { value: true });
const Commands_1 = require("../../structures/Commands");
const gambling_1 = require("../../models/gambling");
const requestGet_1 = require("../../util/functions/requestGet");
exports.default = new Commands_1.Command({
    name: '코인 판매',
    aliases: ['코인 매도'],
    category: '코인',
    usage: '코인 판매 <코인이름> <판매수량>',
    description: '현재 코인의 시세로 코인을 판매합니다.',
    execute: ({ msg, args, client }) => __awaiter(void 0, void 0, void 0, function* () {
        const id = msg.author.id;
        const user = yield gambling_1.gambling.findOne({ id });
        const stock = user.stock;
        const coinName = args[0];
        const userCoin = stock.filter((element) => element.name == coinName)[0];
        const apiOptions = {
            uri: `https://crix-api-endpoint.upbit.com/v1/crix/candles/days/?code=CRIX.UPBIT.${client.coin.get(coinName)}&count=1&to`,
            method: 'GET',
            json: true,
        };
        const coin = yield (0, requestGet_1.requestGet)(apiOptions);
        if (!coinName)
            return msg.reply('판매할 코인을 입력해주시기바랍니다.');
        if (!userCoin)
            return msg.reply('이 코인을 가지고 있지 않습니다.');
        const count = parseFloat(args[1]);
        if (!Number.isInteger(count) || count <= 0)
            return msg.reply('정확한 수량을 입력해주시기바랍니다.');
        if (userCoin.count < count)
            return msg.reply(`파려는 코인의 개수가 현재 코인개수보다 많습니다.\n현재 개수: ${userCoin.count}개`);
        const coinMoney = coin[0].tradePrice;
        const money = coinMoney * count;
        const profit = Math.floor((coinMoney - userCoin.money) * count).toLocaleString();
        const profitShown = money < userCoin.money * count ? profit : '+' + profit;
        const persent = Math.round((coinMoney / userCoin.money - 1) * 100 * 100) / 100;
        const persentShown = persent < 0 ? persent : '+' + persent;
        if (userCoin.count == count) {
            (yield gambling_1.gambling.updateOne({ id }, { $pull: { stock: userCoin }, $inc: { money: Math.round(money) } })).matchedCount;
            msg.reply(`성공적으로 ${coinName} ${count.toLocaleString()}개를 ${money.toLocaleString()}원(개당 ${coinMoney}원)에 판매했습니다!\n손익: ${profitShown}원(${persentShown}%)`);
        }
        else {
            gambling_1.gambling.updateOne({ id, stock: userCoin }, { $inc: { 'stock.$.count': -count, money: Math.round(money) } });
            msg.reply(`성공적으로 ${coinName} ${count.toLocaleString()}개를 ${money.toLocaleString()}원(개당 ${coinMoney}원)에 판매했습니다!\n현재 코인개수: ${userCoin.count}개 -> ${userCoin.count - count}개\n손익: ${profitShown}원(${persentShown}%)`);
        }
    }),
});
