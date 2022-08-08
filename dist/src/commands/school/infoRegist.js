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
exports.default = new Command_1.Command({
    name: '학교등록',
    category: '학교',
    usage: '학교등록',
    description: '자신의 학교정보를 등록해 학교 명령어 사용을 가능하게합니다.',
    execute: ({ interaction, options, client }) => __awaiter(void 0, void 0, void 0, function* () {
        // if (!args[0] || !args[1] || !args[2] || !args[3]) {
        //   interaction.reply('정확한 명령어를 입력해주시기바랍니다.\n!학교 정보등록 <시도> <학교이름(@@중학교)><학년반(1학년 2반)>');
        //   return;
        // }
        // const apiKey = process.env.SCHOOL_API_KEY || '';
        // const id = interaction.author.id;
        // const name = interaction.author.username;
        // const user = await client.models.school.findOne({ id });
        // const date = new Date();
        // const schoolName = args[1];
        // const grade = args[2].split('')[0];
        // const text = args[3].split('');
        // const classNumber = !Number.isInteger(text[3]) ? text[0] : text[0] + text[1];
        // if (!Number.isInteger(parseFloat(grade)) || !Number.isInteger(parseFloat(classNumber))) {
        //   interaction.reply('정확한 학년반을 입력해주시기바랍니다. ex 1학년 2반');
        //   return;
        // }
        // const cityCode = client.sdCode.get(args[0]);
        // const cityName = args[0];
        // if (!cityCode) {
        //   interaction.reply('정확한 시도위치를 입력해주시기바랍니다.');
        //   return;
        // }
        // const basicSchoolOptions = {
        //   uri: ' https://open.neis.go.kr/hub/schoolInfo?Type=json&Size=999',
        //   qs: {
        //     KEY: apiKey,
        //     ATPT_OFCDC_SC_CODE: cityCode,
        //     SCHUL_NM: schoolName,
        //   },
        //   method: 'GET',
        //   json: false,
        // };
        // const basicSchool = JSON.parse(await Utils.requestGet(basicSchoolOptions));
        // if (basicSchool.RESULT != undefined) {
        //   interaction.reply('입력한 정보와 일치하는 학교가 없습니다.');
        //   return;
        // }
        // const schoolCode = basicSchool.schoolInfo[1].row[0].SD_SCHUL_CODE;
        // const classOptions = {
        //   uri: 'https://open.neis.go.kr/hub/classInfo?Type=json&Size=999',
        //   qs: {
        //     KEY: apiKey,
        //     ATPT_OFCDC_SC_CODE: cityCode,
        //     SD_SCHUL_CODE: schoolCode,
        //     AY: date.getFullYear().toString(),
        //     GRADE: grade,
        //   },
        //   method: 'GET',
        //   json: false,
        // };
        // const classInfo = JSON.parse(await Utils.requestGet(classOptions));
        // if (classInfo.RESULT != undefined || parseFloat(classNumber) >= classInfo.classInfo[1].row.length + 1) {
        //   interaction.reply('입력한 반 정보와 일치하는 반이 없습니다.');
        //   return;
        // }
        // if (!user) {
        //   const newSchoolInfo = new school({ id, name, cityCode, cityName, schoolCode, schoolName, grade, class: classNumber });
        //   newSchoolInfo.save();
        //   interaction.reply('성공적으로 유저 정보를 등록했습니다!');
        // } else {
        //   (await client.models.school.updateOne({ id }, { $set: { cityCode, cityName, schoolCode, schoolName, grade, class: classNumber } })).matchedCount;
        //   interaction.reply('성공적으로 유저 정보를 업데이트했습니다!');
        // }
    }),
});
