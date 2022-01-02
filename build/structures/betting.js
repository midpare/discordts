"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bet = exports.bet2 = exports.bet1 = exports.betting = void 0;
class BetDefault {
    constructor() {
        this.betting = false;
        this.title = '';
    }
}
class Bet {
    constructor() {
        this.list = [];
        this.name = '';
        this.times = 0;
    }
    get sum() {
        let result = 0;
        this.list.forEach(element => {
            result += element.money;
        });
        return result;
    }
}
exports.Bet = Bet;
const betting = new BetDefault();
exports.betting = betting;
const bet1 = new Bet();
exports.bet1 = bet1;
const bet2 = new Bet();
exports.bet2 = bet2;
