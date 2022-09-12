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
const Command_1 = require("../../managers/Command");
const Utils_1 = require("../../structures/Utils");
exports.default = new Command_1.Command({
    name: '부계정',
    category: '기본',
    usage: '부계정 <유저>',
    description: '자신의 부계정을 등록합니다',
    // options: [
    //   {
    //     name: '부계정',
    //     description: '부계정을 맨션합니다.',
    //     type: ApplicationCommandOptionType.User,
    //   }
    // ],
    execute: ({ interaction, options, client }) => __awaiter(void 0, void 0, void 0, function* () {
        Utils_1.Utils.reply(interaction, '현재 개발중에 있습니다.');
    }),
});
