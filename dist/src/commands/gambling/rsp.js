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
const gambling_1 = require("../../models/gambling");
const Commands_1 = require("../../structures/Commands");
exports.default = new Commands_1.Command({
    name: 'rsp',
    aliases: ['가위바위보'],
    category: '도박',
    usage: 'rsp <가위/바위/보> <돈>',
    description: '<돈>을 걸고 가위바위보 도박을 진행합니다. (승리시: 2.5배, 비길시: 0.6배, 패배시: 0배)',
    execute: ({ msg, args, client }) => __awaiter(void 0, void 0, void 0, function* () {
        const id = msg.author.id;
        const user = yield gambling_1.gambling.findOne({ id });
        const rspArgs = ['가위', '바위', '보'];
        const random = Math.floor(Math.random() * 3);
        const human = rspArgs.indexOf(args[0]);
        const bot = random;
        if (human < 0)
            return msg.reply('가위, 바위, 보 중 하나를 입력해주시기바랍니다.\n !rsp <가위/바위/보> <돈>');
        const money = parseFloat(args[1]);
        if (!Number.isInteger(money) || money <= 0)
            return msg.reply('정확한 금액을 입력해주시기 바랍니다.');
        if (money > user.money)
            return msg.reply(`현재 잔액보다 높은 돈은 입력하실 수 없습니다. \n현재 잔액: ${user.money.toLocaleString()}원`);
        let winner;
        if (human === bot)
            winner = null;
        else if (human === 0 && bot === 2)
            winner = 'human';
        else if (human === 1 && bot === 0)
            winner = 'human';
        else if (human === 2 && bot === 1)
            winner = 'human';
        else
            winner = 'bot';
        switch (winner) {
            default:
                (yield gambling_1.gambling.updateOne({ id }, { $inc: { money: money * -0.4 } })).matchedCount;
                msg.reply(`사람: ${rspArgs[human]}, 봇: ${rspArgs[bot]}로 비겼습니다.\n${(money * 0.4).toLocaleString()}원를 잃게됩니다.\n잔액: ${user.money.toLocaleString()}원 -> ${(user.money - money * 0.4).toLocaleString()}원`);
                break;
            case 'bot':
                (yield gambling_1.gambling.updateOne({ id }, { $inc: { money: -money } })).matchedCount;
                msg.reply(`사람: ${rspArgs[human]}, 봇: ${rspArgs[bot]}로 봇이 승리했습니다.\n${money.toLocaleString()}원을 잃게 됩니다.\n잔액: ${user.money.toLocaleString()}원 -> ${(user.money - money).toLocaleString()}원`);
                break;
            case 'human':
                (yield gambling_1.gambling.updateOne({ id }, { $inc: { money: money * 1.5 } })).matchedCount;
                msg.reply(`사람: ${rspArgs[human]}, 봇: ${rspArgs[bot]}로 사람이 승리했습니다..\n${(money * 1.5).toLocaleString()}원을 얻게 됩니다.\n잔액: ${user.money.toLocaleString()}원 -> ${(user.money + money * 1.5).toLocaleString()}원`);
                break;
        }
    }),
});
