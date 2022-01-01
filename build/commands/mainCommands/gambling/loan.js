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
module.exports = {
    name: '대출',
    category: 'gambling',
    use: '대출 <돈>',
    description: '최대 100만원까지의 돈을 대출합니다.',
    execute: ({ msg, args }) => __awaiter(void 0, void 0, void 0, function* () {
        const id = msg.author.id;
        const user = yield gambling_1.gambling.findOne({ id });
        if (!args[0])
            return msg.reply('정확한 금액을 입력해주시기바랍니다.');
        const debt = parseFloat(args[0]);
        if (!Number.isInteger(debt) || debt <= 0)
            return msg.reply('정확한 금액를 입력해주시기바랍니다');
        if (user.debt + debt > 1000000)
            return msg.reply(`100만원을 초과하는 빚은 빌릴수 없습니다.`);
        gambling_1.gambling.updateOne({ id }, { $inc: { debt, money: debt } }).then(() => {
            msg.reply(`성공적으로 ${debt.toLocaleString()}원을 대출했습니다!\n 현재 대출금액 ${user.debt.toLocaleString()}원 -> ${(user.debt + debt).toLocaleString()}원`);
        });
    })
};
