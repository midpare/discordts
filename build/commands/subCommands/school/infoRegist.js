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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var school_1 = require("../../../models/school");
var function_1 = require("../../../handler/function");
require("dotenv/config");
var OOE = { '서울특별시': 'B10', '부산광역시': 'C10', '대구광역시': 'D10', '인천광역시': 'E10', '광주광역시': 'F10', '대전광역시': 'G10', '울산광역시': 'H10', '세종특별자치시': 'I10', '경기도': 'J10', '강원도': 'K10', '충청북도': 'M10', '충청남도': 'N10', '전라북도': 'P10', '전라남도': 'Q10', '경상북도': 'R10', '경상남도': 'S10', '제주특별자치도': 'T10' };
module.exports = {
    name: '정보등록',
    category: 'school',
    use: '정보등록 <시도> <학교이름(@@중학교)><학년반(1학년 2반)>',
    description: '자신의 학교정보를 등록해 학교 명령어 사용을 가능하게합니다.',
    execute: function (_a) {
        var msg = _a.msg, args = _a.args;
        return __awaiter(void 0, void 0, void 0, function () {
            var apiKey, id, name, user, date, schoolName, grade, classNumber, text, cityCode, cityName, i, basicSchoolOptions, basicSchool, schoolCode, classOptions, classInfo, newSchoolInfo;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!args[1] || !args[2] || !args[3] || !args[4])
                            return [2 /*return*/, msg.reply('정확한 명령어를 입력해주시기바랍니다.\n!학교 정보등록 <시도> <학교이름(@@중학교)><학년반(1학년 2반)>')];
                        apiKey = process.env.SCHOOL_API_KEY || '';
                        id = msg.author.id;
                        name = msg.author.username;
                        return [4 /*yield*/, school_1.school.findOne({ id: id })];
                    case 1:
                        user = _b.sent();
                        date = new Date();
                        schoolName = args[2];
                        grade = args[3].split('')[0];
                        text = args[4].split('');
                        !Number.isInteger(text[3]) ? classNumber = text[0] : classNumber = text[0] + text[1];
                        if (!Number.isInteger(parseFloat(grade)) || !Number.isInteger(parseFloat(classNumber)))
                            return [2 /*return*/, msg.reply('정확한 학년반을 입력해주시기바랍니다. ex 1학년 2반')];
                        cityCode = '';
                        cityName = '';
                        for (i in OOE) {
                            if (args[1] == i) {
                                cityCode = OOE[i];
                                cityName = i;
                            }
                        }
                        if (cityCode == '')
                            return [2 /*return*/, msg.reply('정확한 시도위치를 입력해주시기바랍니다.')];
                        basicSchoolOptions = {
                            uri: ' https://open.neis.go.kr/hub/schoolInfo?Type=json&Size=999',
                            qs: {
                                KEY: apiKey,
                                ATPT_OFCDC_SC_CODE: cityCode,
                                SCHUL_NM: schoolName,
                            }
                        };
                        return [4 /*yield*/, (0, function_1.requestGet)(basicSchoolOptions)];
                    case 2:
                        basicSchool = _b.sent();
                        if (basicSchool.RESULT != undefined)
                            return [2 /*return*/, msg.reply('입력한 정보와 일치하는 학교가 없습니다.')];
                        schoolCode = basicSchool.schoolInfo[1].row[0].SD_SCHUL_CODE;
                        classOptions = {
                            uri: 'https://open.neis.go.kr/hub/classInfo?Type=json&Size=999',
                            qs: {
                                KEY: apiKey,
                                ATPT_OFCDC_SC_CODE: cityCode,
                                SD_SCHUL_CODE: schoolCode,
                                AY: date.getFullYear().toString(),
                                GRADE: grade
                            }
                        };
                        return [4 /*yield*/, (0, function_1.requestGet)(classOptions)];
                    case 3:
                        classInfo = _b.sent();
                        if (classInfo.RESULT != undefined || parseFloat(classNumber) >= classInfo.classInfo[1].row.length + 1)
                            return [2 /*return*/, msg.reply('입력한 반 정보와 일치하는 반이 없습니다.')];
                        if (!user) {
                            newSchoolInfo = new school_1.school({ id: id, name: name, cityCode: cityCode, cityName: cityName, schoolCode: schoolCode, schoolName: schoolName, grade: grade, class: classNumber });
                            newSchoolInfo.save()
                                .then(function () { return msg.reply('성공적으로 유저 정보를 등록했습니다!'); });
                        }
                        else {
                            school_1.school.updateOne({ id: id }, { $set: { cityCode: cityCode, cityName: cityName, schoolCode: schoolCode, schoolName: schoolName, grade: grade, class: classNumber } })
                                .then(function () { return msg.reply('성공적으로 유저 정보를 업데이트했습니다!'); });
                        }
                        return [2 /*return*/];
                }
            });
        });
    }
};
