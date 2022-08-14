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
const Interval_1 = require("../managers/Interval");
const Utils_1 = require("../structures/Utils");
exports.default = new Interval_1.Interval({
    execute: (client) => __awaiter(void 0, void 0, void 0, function* () {
        const options = {
            uri: 'https://api.upbit.com/v1/market/all',
            method: 'GET',
            json: true,
        };
        const allCoin = yield Utils_1.Utils.requestGet(options);
        for (const coin of allCoin) {
            if (coin.market.startsWith('KRW')) {
                const coinName = coin.korean_name;
                const market = coin.market;
                client.coin.set(coinName, market);
            }
        }
    }),
    interval: '1d',
    immediate: true,
});
