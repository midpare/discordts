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
exports.BetNode = exports.Betting = void 0;
const Utils_1 = require("../Utils");
class Betting {
    constructor(starter, title, name1, name2, client) {
        this.starter = starter;
        this.title = title;
        this.bet1 = new BetNode(name1, client);
        this.bet2 = new BetNode(name2, client);
        this.client = client;
    }
    get persent() {
        const returned = {
            bet1: 0,
            bet2: 0,
        };
        if (this.bet1.sum == 0 && this.bet2.sum == 0)
            return returned;
        const persent = (this.bet1.sum / (this.bet1.sum + this.bet2.sum) * 100);
        returned.bet1 = persent;
        returned.bet2 = 100 - persent;
        return returned;
    }
    get times() {
        const retunred = {
            bet1: 0,
            bet2: 0,
        };
        if (this.bet1.sum != 0)
            retunred.bet1 = 100 / (this.persent.bet1);
        if (this.bet2.sum != 0)
            retunred.bet2 = 100 / (this.persent.bet2);
        return retunred;
    }
    end(winner) {
        return __awaiter(this, void 0, void 0, function* () {
            const winnerNode = this[winner];
            for (const user of winnerNode.user) {
                const id = user.id;
                const result = user.money * this.times[winner];
                (yield this.client.models.gambling.updateOne({ id }, { $inc: { money: result } })).matchedCount;
            }
        });
    }
}
exports.Betting = Betting;
class BetNode {
    constructor(name, client) {
        this.name = name;
        this.user = new Array();
        this.client = client;
    }
    addUser(interaction, money) {
        return __awaiter(this, void 0, void 0, function* () {
            const { guildId, user: { id, username: name } } = interaction;
            const user = yield this.client.models.gambling.findOne({ id, guildId });
            if (money > user.money)
                return Utils_1.Utils.reply(interaction, `자신의 돈보다 많은돈은 입력해실 수 없습니다. \n현재 잔액: ${user.money.toLocaleString()}원`);
            const posArr = this.user.find((element) => element.id = id);
            if (!posArr) {
                this.user.push({ id, money });
                interaction.reply(`${name}님이 '${this.name}'에 ${money.toLocaleString()}원을 베팅했습니다! \n현재잔액 ${user.money.toLocaleString()}원 -> ${(user.money - money).toLocaleString()}원`);
            }
            else {
                if (posArr.money + money < 0)
                    return Utils_1.Utils.reply(interaction, `베팅액보다 큰 금액을 뺄 수는 없습니다 \n현재 베팅액: ${posArr.money.toLocaleString()}`);
                posArr.money += money;
                interaction.reply(`${name}님이 '${this.name}'에 ${money.toLocaleString()}원을 추가로 베팅했습니다! \n현재 베팅액: ${(posArr.money - money).toLocaleString()}원 -> ${posArr.money.toLocaleString()}원 \n현재 잔액 ${user.money.toLocaleString()}원 -> ${(user.money - money).toLocaleString()}원`);
            }
            (yield this.client.models.gambling.updateOne({ id, guildId }, { $inc: { money: -money } })).matchedCount;
        });
    }
    get sum() {
        let result = 0;
        for (const user of this.user) {
            result += user.money;
        }
        return result;
    }
}
exports.BetNode = BetNode;
