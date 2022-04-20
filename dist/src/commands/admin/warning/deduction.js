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
const Commands_1 = require("../../../structures/Commands");
const warning_1 = require("../../../models/warning");
const Client_1 = require("../../../structures/Client");
const message_1 = require("../../../util/language/message");
exports.default = new Commands_1.Command({
    name: '경고 차감',
    category: '관리자',
    usage: '경고 차감 <유저> <횟수> [사유]',
    description: '유저의 경고를 차감합니다.',
    execute: ({ msg, args }) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c;
        if (!((_a = msg.member) === null || _a === void 0 ? void 0 : _a.roles.cache.has('910521119713394745')) && !((_b = msg.member) === null || _b === void 0 ? void 0 : _b.roles.cache.has('910521119713394744')))
            return msg.reply(message_1.messages.missingPermissionUser);
        const target = (_c = msg.mentions.members) === null || _c === void 0 ? void 0 : _c.first();
        const count = parseFloat(args[1]);
        const channel = Client_1.client.channels.cache.get('910521119877005363');
        if (!target)
            return msg.reply(message_1.messages.admin.warning.deduction.missingMentionUser);
        if (count <= 0 || !Number.isInteger(count)) {
            return msg.reply(message_1.messages.naturalNumber);
        }
        const id = target.id;
        const user = yield warning_1.warning.findOne({ id });
        const reason = !args[2] ? message_1.messages.none : args.slice(2).join(' ');
        if (!user || user.warning <= 0)
            return msg.reply(message_1.messages.admin.warning.deduction.noneWarning);
        if (user.warning - count < 0)
            return msg.reply(message_1.messages.admin.warning.deduction.overWarning);
        (yield warning_1.warning.updateOne({ id }, { $inc: { warning: -count } })).matchedCount;
        channel.send(message_1.messages.admin.warning.deduction.success(target.user, count, user.warning - count, reason));
    }),
});
