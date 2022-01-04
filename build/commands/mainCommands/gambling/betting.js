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
const commands_1 = require("../../../contexts/commands");
const betting_1 = require("../../../contexts/betting");
const gambling_1 = require("../../../models/gambling");
const client_1 = require("../../../contexts/client");
exports.default = new commands_1.Command({
    name: '베팅',
    category: 'gambling',
    usage: '베팅',
    description: '베팅을 합니다.',
    execute: ({ msg, args }) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        const id = msg.author.id;
        const name = msg.author.username;
        const command = (_a = client_1.client.subCommands.get('betting')) === null || _a === void 0 ? void 0 : _a.get(args[0]);
        const alias = (_b = client_1.client.subAliases.get('betting')) === null || _b === void 0 ? void 0 : _b.get(args[0]);
        if (command) {
            command.execute({ msg, args });
            return;
        }
        else if (alias) {
            alias.execute({ msg, args });
            return;
        }
        if (!betting_1.betting.betting)
            return msg.reply('아직 베팅을 시작하지 않았습니다.');
        if (args[0] != betting_1.bet1.name && args[0] != betting_1.bet2.name)
            return;
        switch (args[0]) {
            case betting_1.bet1.name:
                bettingFunction(betting_1.bet1);
                break;
            case betting_1.bet2.name:
                bettingFunction(betting_1.bet2);
                break;
        }
        function bettingFunction(bet) {
            return __awaiter(this, void 0, void 0, function* () {
                const money = parseFloat(args[1]);
                if (!money)
                    return msg.reply('정확한 돈을 입력해주시기바랍니다.');
                if (!Number.isInteger(money) || money == 0)
                    return msg.reply('정확한 정수를 입력해주시기바랍니다.');
                const user = yield gambling_1.gambling.findOne({ id });
                if (money > user.money)
                    return msg.reply(`자신의 돈보다 많은돈은 입력해실 수 없습니다. \n현재 잔액: ${user.money.toLocaleString()}원`);
                const posArr = bet.list.find((element) => element.id = id);
                if (!posArr) {
                    bet.list.push({ id, money });
                    msg.reply(`${name}님이 "${bet.name}"에 ${money.toLocaleString()}원을 베팅했습니다! \n현재잔액 ${user.money.toLocaleString()}원 -> ${(user.money - money).toLocaleString()}원`);
                }
                else {
                    if (posArr.money + money < 0)
                        return msg.reply(`베팅액보다 큰 금액을 뺄 수는 없습니다 \n현재 베팅액: ${posArr.money.toLocaleString()}`);
                    posArr.money += money;
                    msg.reply(`${name}님이 "${bet.name}"에 ${money.toLocaleString()}원을 추가로 베팅했습니다! \n현재 베팅액: ${(posArr.money - money).toLocaleString()}원 -> ${posArr.money.toLocaleString()}원 \n현재 잔액 ${user.money.toLocaleString()}원 -> ${(user.money - money).toLocaleString()}원`);
                }
                (yield gambling_1.gambling.updateOne({ id }, { $inc: { money: -money } })).matchedCount;
            });
        }
    }),
});
