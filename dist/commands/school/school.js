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
const discord_js_1 = require("discord.js");
const Command_1 = require("../../managers/Command");
const Utils_1 = require("../../structures/Utils");
const weekArr = ['월', '화', '수', '목', '금'];
const choices = new Array();
for (const day of weekArr) {
    const timeTable = {
        name: `${day}요일시간표`,
        value: `${day}요일시간표`
    };
    choices.push(timeTable);
    const meal = {
        name: `${day}요일급식`,
        value: `${day}요일급식`,
    };
    choices.push(meal);
}
exports.default = new Command_1.Command({
    name: '학교',
    category: '학교',
    usage: '학교',
    description: '학교 관련 명령어를 사용합니다.',
    options: [
        {
            name: '정보',
            description: '학교에 관한 정보를 입력합니다.',
            type: discord_js_1.ApplicationCommandOptionType.String,
            required: true,
            choices,
        },
    ],
    execute: ({ interaction, options, client }) => __awaiter(void 0, void 0, void 0, function* () {
        const apiKey = process.env.SCHOOL_API_KEY || '';
        const embed = new discord_js_1.EmbedBuilder();
        const { guildId, user: { id } } = interaction;
        const info = options.getString('정보', true);
        const dateVariable = new Date();
        const week = dateVariable.getDay();
        const findWeek = weekArr.indexOf(info[0]) + 1;
        const weekDay = info.slice(0, 3);
        const dayNext = findWeek >= week ? findWeek - week : 7 - (week - findWeek);
        const user = yield client.models.school.findOne({ id, guildId });
        if (info.endsWith('시간표')) {
            const timeTableDate = Utils_1.Utils.dateCal(dateVariable, dayNext);
            if (!user) {
                Utils_1.Utils.reply(interaction, '학교등록이 되지 않은 유저입니다.', true);
                return 0;
            }
            const timeTableOptions = {
                uri: 'https://open.neis.go.kr/hub/misTimetable?Type=json&pSize=999',
                qs: {
                    KEY: apiKey,
                    ATPT_OFCDC_SC_CODE: user.cityCode,
                    SD_SCHUL_CODE: user.schoolCode,
                    GRADE: user.grade,
                    CLASS_NM: user.class,
                    ALL_TI_YMD: timeTableDate,
                },
                method: 'GET',
                json: false,
            };
            const timeTableYear = timeTableDate[0] + timeTableDate[1] + timeTableDate[2] + timeTableDate[3];
            const timeTableMonth = timeTableDate[4] + timeTableDate[5];
            const timeTableDay = timeTableDate[6] + timeTableDate[7];
            const timeTable = JSON.parse(yield Utils_1.Utils.request(timeTableOptions));
            if (timeTable.misTimetable == undefined || timeTable.misTimetable[1].row[0].ITRT_CNTNT === '토요휴업일') {
                embed
                    .setTitle('시간표')
                    .setDescription('오늘은 시간표가 없습니다.')
                    .setColor(discord_js_1.Colors.Red);
                interaction.editReply({ embeds: [embed] });
            }
            else {
                embed
                    .setTitle(info)
                    .setDescription(`${timeTableYear}-${timeTableMonth}-${timeTableDay}\n${user.grade}학년 ${user.class}반 ${user.schoolName}`)
                    .setColor(discord_js_1.Colors.Green);
                for (let i = 0; i < timeTable.misTimetable[1].row.length; i++) {
                    embed.addFields({ name: `${i + 1}교시`, value: `${timeTable.misTimetable[1].row[i].ITRT_CNTNT}`, inline: false });
                }
                interaction.editReply({ embeds: [embed] });
            }
        }
        else if (info.endsWith('급식')) {
            const mealDate = Utils_1.Utils.dateCal(dateVariable, dayNext);
            if (!user) {
                Utils_1.Utils.reply(interaction, '학교등록이 되지 않은 유저입니다.', true);
                return 0;
            }
            const mealOptions = {
                uri: 'https://open.neis.go.kr/hub/mealServiceDietInfo?Type=json&pSize=999',
                qs: {
                    KEY: apiKey,
                    ATPT_OFCDC_SC_CODE: user.cityCode,
                    SD_SCHUL_CODE: user.schoolCode,
                    MLSV_YMD: mealDate,
                },
                method: 'GET',
                json: false,
            };
            const meal = JSON.parse(yield Utils_1.Utils.request(mealOptions));
            if (meal.RESULT != undefined) {
                embed
                    .setTitle('급식')
                    .setDescription('오늘은 급식이 없습니다.')
                    .setColor(discord_js_1.Colors.Red);
                interaction.editReply({ embeds: [embed] });
            }
            else {
                const mealYear = mealDate[0] + mealDate[1] + mealDate[2] + mealDate[3];
                const mealMonth = mealDate[4] + mealDate[5];
                const mealDay = mealDate[6] + mealDate[7];
                embed
                    .setTitle(`${weekDay} 급식`)
                    .setDescription(`${mealYear}-${mealMonth}-${mealDay}(${user.schoolName})`)
                    .addFields({ name: '급식정보', value: meal.mealServiceDietInfo[1].row[0].DDISH_NM.replace(/<br\/>/gi, '\n').replace(/[0-9.]/gi, ''), inline: false })
                    .setColor(discord_js_1.Colors.Aqua);
                interaction.editReply({ embeds: [embed] });
            }
        }
        return 1;
    }),
});
