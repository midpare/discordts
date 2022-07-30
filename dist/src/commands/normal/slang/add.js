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
const Commands_1 = require("../../../managers/Commands");
const Utils_1 = require("../../../structures/Utils");
exports.default = new Commands_1.Command({
    name: '망언 추가',
    private: true,
    execute: ({ msg, args, client }) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const target = (_a = msg.mentions.members) === null || _a === void 0 ? void 0 : _a.first();
        if (!target) {
            Utils_1.Utils.reply(msg, client.messages.missingMentionUser('망언을 추가'));
            return;
        }
        const { id, user: { username: name } } = target;
        if (!args[1]) {
            Utils_1.Utils.reply(msg, '망언 내용을 작성해주시기 바랍니다.');
            return;
        }
        const content = args.slice(1).join(' ');
        const user = yield client.models.slang.findOne({ id });
        const slang = yield client.models.slang.findOne({ id, slangs: { $all: [content] } });
        if (slang) {
            Utils_1.Utils.reply(msg, '이 망언은 이미 추가되어있습니다.');
            return;
        }
        if (!user) {
            const newUser = new client.models.slang({ id, name, slang: [] });
            yield newUser.save();
        }
        (yield client.models.slang.updateOne({ id }, { $push: { slangs: content } })).matchedCount;
        Utils_1.Utils.reply(msg, `성공적으로 망언을 추가했습니다!\n망언 내용: ${content}`);
    })
});
