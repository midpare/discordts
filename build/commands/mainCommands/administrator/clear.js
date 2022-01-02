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
module.exports = {
    name: "clear",
    aliases: ['클리어'],
    category: 'admin',
    usage: 'clear <숫자>',
    description: '메시지를 보낸 채팅방에 <숫자>만큼의 채팅을 지웁니다.',
    execute: ({ msg, args }) => __awaiter(void 0, void 0, void 0, function* () {
        const count = parseFloat(args[0]);
        if (!Number.isInteger(count))
            return msg.reply("정확한 자연수를 입력해주시기 바랍니다.\n !clear <숫자>  ");
        if (count < 0 || count > 99)
            return msg.reply("1에서 99사이의 수를 입력해주시기 바랍니다. \n !clear <숫자>");
        msg.channel.bulkDelete(count + 1);
    })
};
