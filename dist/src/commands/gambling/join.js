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
const gambling_1 = require("../../models/gambling");
const Commands_1 = require("../../managers/Commands");
exports.default = new Commands_1.Command({
    name: '가입',
    category: '도박',
    usage: '가입',
    description: '도박 관련 명령어를 사용할수있게 가입을 합니다.',
    execute: ({ msg, client }) => __awaiter(void 0, void 0, void 0, function* () {
        const id = msg.author.id;
        const name = msg.author.username;
        const user = yield client.models.gambling.findOne({ id });
        if (user) {
            msg.reply(client.messages.gambling.join.alreadyJoin);
            return;
        }
        const newUser = new gambling_1.gambling({ id, name, stock: [] });
        yield newUser.save();
        msg.reply(client.messages.gambling.join.success);
    }),
});
