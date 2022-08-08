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
const Utils_1 = require("../../structures/Utils");
const discord_js_1 = require("discord.js");
const Command_1 = require("../../managers/Command");
exports.default = new Command_1.Command({
    name: '코인풀매도',
    category: '코인',
    usage: '코인풀매도 <코인이름>',
    description: '현재 갖고있는 코인을 전부 판매합니다.',
    options: [
        {
            name: '이름',
            description: '판매할 코인의 이름을 입력합니다.',
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
        const apiOptions = {
            uri: `https://crix-api-endpoint.upbit.com/v1/crix/candles/days/?code=CRIX.UPBIT.${client.coin.get(coinName)}&count=1&to`,
            method: 'GET',
            json: true,
        };
        const coin = yield Utils_1.Utils.requestGet(apiOptions);
        if (!coin) {
            Utils_1.Utils.reply(interaction, '정확한 코인을 입력해주시기바랍니다.');
            return;
        }
        if (!userCoin) {
            Utils_1.Utils.reply(interaction, '이 코인을 가지고 있지 않습니다.');
            return;
        }
        const coinMoney = coin[0].tradePrice;
        const count = userCoin.count;
        const money = coinMoney * count;
        const profit = Math.floor((coinMoney - userCoin.money) * count).toLocaleString();
        const profitShown = money < userCoin.money * count ? profit : '+' + profit;
        const persent = Math.round((coinMoney / userCoin.money - 1) * 100 * 100) / 100;
        const persentShown = persent < 0 ? persent : '+' + persent;
        (yield client.models.gambling.updateOne({ id, guildId }, { $pull: { stock: userCoin }, $inc: { money: Math.round(money) } })).matchedCount;
        interaction.reply(`성공적으로 ${coinName} ${count.toLocaleString()}개를 ${money.toLocaleString()}원(개당 ${coinMoney}원)에 판매했습니다!\n손익: ${profitShown}원(${persentShown}%)`);
    }),
});
