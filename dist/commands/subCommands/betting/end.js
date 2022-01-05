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
const Commands_1 = require("../../../structures/Commands");
const gambling_1 = require("../../../models/gambling");
const Betting_1 = require("../../../structures/Betting");
exports.default = new Commands_1.Command({
    name: '종료',
    category: 'betting',
    usage: '베팅 종료 <팀>',
    description: '베팅을 종료합니다.',
    execute: ({ msg, args }) => __awaiter(void 0, void 0, void 0, function* () {
        if (!Betting_1.betting.betting)
            return msg.reply('아직 베팅을 시작하지 않았습니다.');
        const winner = args[1];
        if (winner != Betting_1.bet1.name && winner != Betting_1.bet2.name)
            return msg.reply(`${Betting_1.bet1.name}과 ${Betting_1.bet2.name}중 승리팀을 선택해주시기 바랍니다.`);
        switch (winner) {
            case Betting_1.bet1.name:
                result(Betting_1.bet1);
                break;
            case Betting_1.bet2.name:
                result(Betting_1.bet2);
                break;
        }
        function result(bet) {
            return __awaiter(this, void 0, void 0, function* () {
                msg.reply(`${bet.name}팀이 승리했습니다!`);
                bet.list.forEach((element) => __awaiter(this, void 0, void 0, function* () {
                    const id = element.id;
                    const moneyResult = element.money * bet.times;
                    (yield gambling_1.gambling.updateOne({ id }, { $inc: { money: moneyResult } })).matchedCount;
                }));
            });
        }
        Betting_1.bet1.list = [];
        Betting_1.bet2.list = [];
        Betting_1.betting.betting = false;
    }),
});
