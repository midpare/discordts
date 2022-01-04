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
const betting_1 = require("../../../contexts/betting");
module.exports = {
    name: '종료',
    category: 'betting',
    execute: ({ msg, args }) => __awaiter(void 0, void 0, void 0, function* () {
        if (!betting_1.betting.betting)
            return msg.reply('아직 베팅을 시작하지 않았습니다.');
        const winner = args[1];
        if (winner != betting_1.bet1.name && winner != betting_1.bet2.name)
            return msg.reply(`${betting_1.bet1.name}과 ${betting_1.bet2.name}중 승리팀을 선택해주시기 바랍니다.`);
        switch (winner) {
            case betting_1.bet1.name:
                result(betting_1.bet1);
                break;
            case betting_1.bet2.name:
                result(betting_1.bet2);
                break;
        }
        function result(bet) {
            return __awaiter(this, void 0, void 0, function* () {
                msg.reply(`${bet.name}팀이 승리했습니다!`);
                for (let i = 0; i < bet.list.length; i++) {
                    const id = bet.list[i].id;
                    const moneyResult = bet.list[i].money * bet.times;
                    (yield gambling_1.gambling.updateOne({ id }, { $inc: { money: moneyResult } })).matchedCount;
                }
            });
        }
        betting_1.bet1.list = [];
        betting_1.bet2.list = [];
        betting_1.betting.betting = false;
    })
};
