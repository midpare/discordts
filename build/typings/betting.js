"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bet2 = exports.bet1 = exports.betting = void 0;
var betDefault = /** @class */ (function () {
    function betDefault() {
        this.betting = false;
        this.title = '';
    }
    return betDefault;
}());
var bet = /** @class */ (function () {
    function bet() {
        this.list = [];
        this.start = false;
        this.name = null;
        this.moneyBefore = 0;
        this.times = 0;
    }
    Object.defineProperty(bet.prototype, "betName", {
        get: function () {
            return this.name;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(bet.prototype, "sum", {
        get: function () {
            var result = 0;
            for (var i = 0; i < this.list.length; i++) {
                result += this.list[i].money;
            }
            return result;
        },
        enumerable: false,
        configurable: true
    });
    return bet;
}());
var betting = new betDefault();
exports.betting = betting;
var bet1 = new bet();
exports.bet1 = bet1;
var bet2 = new bet();
exports.bet2 = bet2;
