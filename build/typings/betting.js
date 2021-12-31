"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bet = exports.bet2 = exports.bet1 = exports.betting = void 0;
class betDefault {
    constructor() {
        this.betting = false;
        this.title = '';
    }
}
class bet {
    constructor() {
        this.list = [];
        this.start = false;
        this.name = null;
        this.moneyBefore = 0;
        this.times = 0;
    }
    get betName() {
        return this.name;
    }
    get sum() {
        let result = 0;
        for (let i = 0; i < this.list.length; i++) {
            result += this.list[i].money;
        }
        return result;
    }
}
exports.bet = bet;
const betting = new betDefault();
exports.betting = betting;
const bet1 = new bet();
exports.bet1 = bet1;
const bet2 = new bet();
exports.bet2 = bet2;
