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
const Interaction_1 = require("../../managers/Interaction");
exports.default = new Interaction_1.Interaction({
    name: 'upload',
    deleted: true,
    execute: ({ interaction, options, client }) => __awaiter(void 0, void 0, void 0, function* () {
        if (!options || !options.data)
            return;
        const { guildId, user: { id, username: name } } = interaction;
        const school = client.models.school;
        const { cityCode, cityName, schoolCode, schoolName, grade } = options.data;
        const _class = interaction.values[0];
        const user = yield school.findOne({ id, guildId });
        if (!user) {
            const newSchoolInfo = new school({ id, guildId, name, cityCode, cityName, schoolCode, schoolName, grade, class: _class });
            newSchoolInfo.save();
            interaction.reply('성공적으로 유저 정보를 등록했습니다!');
        }
        else {
            (yield client.models.school.updateOne({ id, guildId }, { $set: { cityCode, cityName, schoolCode, schoolName, grade, class: _class } })).matchedCount;
            interaction.reply('성공적으로 유저 정보를 업데이트했습니다!');
        }
    }),
});
