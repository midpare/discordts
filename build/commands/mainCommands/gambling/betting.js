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
const betting_1 = require("../../../structures/betting");
const gambling_1 = require("../../../models/gambling");
const client_1 = require("../../../structures/client");
module.exports = {
    name: '베팅',
    category: 'gambling',
    use: '베팅',
    description: '베팅을 합니다.',
    execute: ({ msg, args }) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        const id = msg.author.id;
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
        const money = parseFloat(args[1]);
        if (!Number.isInteger(money))
            return msg.reply('정확한 자연수를 입력해주시기바랍니다.');
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
                const user = yield gambling_1.gambling.findOne({ id });
                if (money > user.money)
                    return msg.reply(`자신의 돈보다 많은돈은 입력해실 수 없습니다. \n현재잔액: ${user.money.toLocaleString()}원`);
                const posArray = bet.list.filter((item) => item.id === user.id);
                function posFunction(element) {
                    if (element.id === user.id)
                        return true;
                }
                if (posArray.length <= 0) {
                    bet.list.push({ id: user.id, money: money });
                    gambling_1.gambling.updateOne({ id }, { $inc: { money: -money } })
                        .then(() => msg.reply(`${user.name}님이 "${bet.name}"에 ${money.toLocaleString()}원을 베팅했습니다! \n현재잔액 ${user.money.toLocaleString()}원 -> ${(user.money - money).toLocaleString()}원`));
                    bet.moneyBefore = money;
                }
                else {
                    const arr = bet.list.findIndex(posFunction);
                    if (bet.list[arr].money + money < 0)
                        return msg.reply(`베팅액보다 큰 금액을 뺄 수는 없습니다 \n현재 베팅액: ${bet.list[arr].money.toLocaleString()}`);
                    bet.list.splice(arr, 1, { id: user.id, money: bet.moneyBefore + money });
                    gambling_1.gambling.updateOne({ id }, { $inc: { money: -money } })
                        .then(() => msg.reply(`${user.name}님이 "${bet.name}"에 ${money.toLocaleString()}원을 추가로 베팅했습니다! \n현재 베팅액: ${(bet.list[arr].money - money).toLocaleString()}원 -> ${bet.list[arr].money.toLocaleString()}원 \n현재잔액 ${user.money.toLocaleString()}원 -> ${(user.money - money).toLocaleString()}원`));
                    bet.moneyBefore = bet.list[arr].money;
                }
            });
        }
    })
};
