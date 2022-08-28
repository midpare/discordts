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
const Command_1 = require("../../managers/Command");
const Utils_1 = require("../../structures/Utils");
const discord_js_1 = require("discord.js");
exports.default = new Command_1.Command({
    name: '코인풀매수',
    aliases: ['코인전부구매'],
    category: '코인',
    usage: '코인풀매수 <코인이름>',
    description: '갖고있는 모든 돈으로 코인을 구매합니다.',
    options: [
        {
            name: '이름',
            description: '구매할 코인의 이름을 입력합니다.',
            type: discord_js_1.ApplicationCommandOptionType.String,
            required: true,
        },
    ],
    execute: ({ interaction, options, client }) => __awaiter(void 0, void 0, void 0, function* () {
        const { guildId, user: { id } } = interaction;
        const user = yield client.models.gambling.findOne({ id, guildId });
        const stock = user.stock;
        const coinName = options.getString('이름', true);
        const userCoin = stock.filter((element) => element.name == coinName)[0];
        const coinId = client.coin.get(coinName);
        if (!coinId) {
            Utils_1.Utils.reply(interaction, '정확한 코인을 입력해주시기바랍니다.');
            return;
        }
        const apiOptions = {
            uri: `https://crix-api-endpoint.upbit.com/v1/crix/candles/days/?code=CRIX.UPBIT.${coinId}&count=1&to`,
            method: 'GET',
            json: true,
        };
        const coin = yield Utils_1.Utils.request(apiOptions);
        const coinMoney = coin[0].tradePrice;
        const count = Math.floor(user.money / coinMoney);
        const money = coinMoney * count;
        if (userCoin) {
            const moneyAve = (userCoin.money * userCoin.count + money) / (userCoin.count + count);
            (yield client.models.gambling.updateOne({ id, guildId, stock: userCoin }, { $set: { 'stock.$.money': moneyAve }, $inc: { 'stock.$.count': count, money: Math.round(-money) } })).matchedCount;
            interaction.reply(`성공적으로 ${coinName} ${count.toLocaleString()}개를 ${money.toLocaleString()}원(개당 ${coinMoney.toLocaleString()}원)에 추가로 구매했습니다!\n현재 평단가: ${userCoin.money.toLocaleString()}원 -> ${(Math.floor(moneyAve * 100) / 100).toLocaleString()}원\n현재 구매량: ${userCoin.count}개 -> ${(userCoin.count + count).toLocaleString()}개`);
        }
        else {
            const stockObject = {
                name: coinName,
                count: count,
                money: coinMoney,
            };
            (yield client.models.gambling.updateOne({ id, guildId }, { $push: { stock: stockObject }, $inc: { money: Math.round(-money) } })).matchedCount;
            interaction.reply(`성공적으로 ${coinName} ${count.toLocaleString()}개를 ${(money).toLocaleString()}원(개당 ${coinMoney.toLocaleString()}원)에 구매했습니다!`);
        }
    }),
});
