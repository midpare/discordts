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
const gambling_1 = require("../../../models/gambling");
const commands_1 = require("../../../contexts/commands");
exports.default = new commands_1.Command({
    name: 'rsp',
    aliases: ['가위바위보'],
    category: 'gambling',
    usage: 'rsp <가위/바위/보> <돈>',
    description: '<돈>을 걸고 가위바위보 도박을 진행합니다. (승리시: 2.5배, 비길시: 0.6배, 패배시: 0배)',
    execute: ({ msg, args }) => __awaiter(void 0, void 0, void 0, function* () {
        const id = msg.author.id;
        const user = yield gambling_1.gambling.findOne({ id });
        if (user.gamLevel % 2 != 0)
            return msg.reply('이 도박을 할 수 있는 권한이 없습니다 \n!상점에서 도박권을 구매하십시오');
        const money = parseFloat(args[1]);
        if (isNaN(money))
            return msg.reply('베팅할 돈을 입력해주시기바랍니다.');
        if (money > user.money)
            return msg.reply('현재 잔액보다 높은돈을 입력하실수없습니다.');
        const rspArgs = ['가위', '바위', '보'];
        const even = (element) => msg.content.includes(element);
        if (!rspArgs.some(even))
            return msg.reply('가위, 바위, 보 중 하나를 입력해주시기바랍니다.\n !rsp <가위/바위/보> <돈>');
        const random = Math.floor(Math.random() * 3);
        const human = args[0];
        const bot = rspArgs[random];
        let winner = '';
        if (human === bot) {
            winner = '비김';
        }
        else {
            human === '보' ? (winner = bot === '가위' ? '봇' : '인간') : '';
            human === '가위' ? (winner = bot === '바위' ? '봇' : '인간') : '';
            human === '바위' ? (winner = bot === '보' ? '봇' : '인간') : '';
        }
        switch (winner) {
            case '비김':
                gambling_1.gambling.updateOne({ id }, { $inc: { money: money * -0.4 } });
                msg.reply(`사람: ${human} 봇: ${bot}\n비겼습니다.\n${money * 0.4}원를 잃게됩니다.\n잔액: ${user.money}원 -> ${user.money - money * 0.4}원`);
                break;
            case '봇':
                (yield gambling_1.gambling.updateOne({ id }, { $inc: { money: -money } })).matchedCount;
                msg.reply(`사람: ${human} 봇: ${bot}\n${winner}이 승리했습니다.\n${money}원을 잃게 됩니다.\n잔액: ${user.money}원 -> ${user.money - money}원`);
                break;
            case '인간':
                (yield gambling_1.gambling.updateOne({ id }, { $inc: { money: money * 1.5 } })).matchedCount;
                msg.reply(`사람: ${human} 봇: ${bot}\n${winner}이 승리했습니다.\n${money * 1.5}원을 얻었습니다.\n잔액: ${user.money}원 -> ${user.money + money * 1.5}원`);
                break;
        }
    }),
});
