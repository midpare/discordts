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
const client_1 = require("../contexts/client");
const gambling_1 = require("../models/gambling");
const function_1 = require("../handler/function");
module.exports = {
    name: 'messageCreate',
    event: (msg) => __awaiter(void 0, void 0, void 0, function* () {
        const prefix = process.env.PREFIX || '';
        if (msg.author.bot || msg.author.id === client_1.client.user.id || !msg.content.startsWith(prefix))
            return;
        const id = msg.author.id;
        const [cmd, ...args] = msg.content.slice(prefix.length).trim().split(/ +/g);
        const command = client_1.client.mainCommands.get(cmd.toLowerCase());
        const aliase = client_1.client.mainAliases.get(cmd.toLowerCase());
        const date = new Date();
        const today = (0, function_1.dateCal)(date, 0);
        try {
            if (command) {
                const user = yield gambling_1.gambling.findOne({ id });
                if (command.category == 'gambling' && command.name != '가입') {
                    if (!user)
                        return msg.reply('가입되지 않은 유저입니다 !가입 을 통해 가입해주시기 바랍니다.');
                    if (user.bankruptcy && parseFloat(today) - parseFloat(user.bankruptcy) < 3)
                        return msg.reply(`파산한지 3일이 지나지 않은 유저는 도박을 할 수 없습니다. 파산일${user.bankruptcy}`);
                }
                command.execute({ msg, args });
            }
            else if (aliase) {
                aliase.execute({ msg, args });
            }
            else
                return;
        }
        catch (error) {
            console.error(error);
        }
    })
};
