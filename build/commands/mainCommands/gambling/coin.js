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
const client_1 = require("../../../structures/client");
module.exports = {
    name: '코인',
    category: 'gambling',
    subCategory: 'coin',
    usage: '코인',
    description: '코인명령어를 사용합니다.',
    execute: ({ msg, args }) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        const command = (_a = client_1.client.subCommands.get('coin')) === null || _a === void 0 ? void 0 : _a.get(args[0]);
        const alias = (_b = client_1.client.subAliases.get('coin')) === null || _b === void 0 ? void 0 : _b.get(args[0]);
        if (command) {
            command.execute({ msg, args });
        }
        else if (alias) {
            alias.execute({ msg, args });
        }
        else
            return;
    })
};
