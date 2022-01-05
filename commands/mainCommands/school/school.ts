import { MessageEmbed } from 'discord.js';
import { school } from '../../../models/school';
import { Command } from '../../../structures/Commands';
import { dateCal, requestGet } from '../../../structures/Util';
import { client } from '../../../structures/Client';

export default new Command({
  name: '학교',
  category: 'school',
  usage: '학교',
  description: '학교 명령어',
  execute: async ({ msg, args }) => {
    const apiKey = process.env.SCHOOL_API_KEY || '';
    if (!args[0])
      return;
    const embed = new MessageEmbed();
    const id = msg.author.id;

    const dateVariable = new Date();
    const weekArr = ['일', '월', '화', '수', '목', '금', '토'];
    const week = dateVariable.getDay();
    const findWeek = weekArr.indexOf(args[0].split('')[0]);
    const weekDay = findWeek > -1 ? weekArr[findWeek] + '요일' : '';
    const user = await school.findOne({ id });

    const command = client.subCommands.get('school')?.get(args[0]);
    const alias = client.subAliases.get('school')?.get(args[0]);

    if (command) {
      command.execute({ msg, args });
      return;
    } else if (alias) {
      alias.execute({ msg, args });
      return;
    }
    switch (args[0]) {
      case `${weekDay}시간표`:
        const timeTableNumber = weekDay != '' ? findWeek >= week ? findWeek - week : 7 - (week - findWeek) : 0;
        const timeTableWeekDay = weekDay != '' ? weekArr[findWeek] : weekArr[week];

        const timeTableDate = dateCal(dateVariable, timeTableNumber);

        if (!user)
          return msg.reply('정보등록이 되지 않은 유저입니다.\n!학교 정보등록 <시도(서울특별시)> <학교이름(@@중학교)><학년반(1학년 2반)>\n으로 정보등록을 해주시기 바랍니다.');

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

        const timeTableDateSplit = timeTableDate.split('');
        const timeTableYear = timeTableDateSplit[0] + timeTableDateSplit[1] + timeTableDateSplit[2] + timeTableDateSplit[3];
        const timeTableMonth = timeTableDateSplit[4] + timeTableDateSplit[5];
        const timeTableDay = timeTableDateSplit[6] + timeTableDateSplit[7];
        const timeTable = JSON.parse(await requestGet(timeTableOptions));
        if (timeTable.misTimetable == undefined || timeTable.misTimetable[1].row[0].ITRT_CNTNT === '토요휴업일') {
          embed
            .setTitle('시간표')
            .setDescription('오늘은 시간표가 없습니다.')
            .setColor('RED');
          msg.channel.send({ embeds: [embed] });
          return;
        }
        embed
          .setTitle(`${timeTableWeekDay}요일 시간표`)
          .setDescription(`${timeTableYear}-${timeTableMonth}-${timeTableDay}\n${user.grade}학년 ${user.class}반 ${user.schoolName}`)
          .setColor('GREEN');
        for (let i = 0; i < timeTable.misTimetable[1].row.length; i++) {
          embed.addField(`${i + 1}교시`, `${timeTable.misTimetable[1].row[i].ITRT_CNTNT}`);
        }
        msg.channel.send({ embeds: [embed] });
        break;
      case `${weekDay}급식` || `${weekDay}급식정보`:
        const mealNumber = weekDay != '' ? findWeek >= week ? findWeek - week : 7 - (week - findWeek) : 0;
        const mealWeekDay = weekDay != '' ? weekArr[findWeek] : weekArr[week];

        const mealDate = dateCal(dateVariable, mealNumber);
        if (!user)
          return msg.reply('정보등록이 되지 않은 유저입니다.\n!학교 정보등록 <시도(서울특별시)> <학교이름(@@중학교)><학년반(1학년 2반)>\n으로 정보등록을 해주시기 바랍니다.');

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
        const meal = JSON.parse(await requestGet(mealOptions));
        if (meal.RESULT != undefined) {
          embed
            .setTitle('급식')
            .setDescription('오늘은 급식이 없습니다.')
            .setColor('RED');
          msg.channel.send({ embeds: [embed] });
          return;
        }
        const mealDateSplit = mealDate.split('');
        const mealYear = mealDateSplit[0] + mealDateSplit[1] + mealDateSplit[2] + mealDateSplit[3];
        const mealMonth = mealDateSplit[4] + mealDateSplit[5];
        const mealDay = mealDateSplit[6] + mealDateSplit[7];

        embed
          .setTitle(`${mealWeekDay}요일 급식`)
          .setDescription(`${mealYear}-${mealMonth}-${mealDay}(${user.schoolName})`)
          .addField('급식정보', meal.mealServiceDietInfo[1].row[0].DDISH_NM.replace(/<br\/>/gi, '\n').replace(/[0-9.]/gi, ''))
          .setColor('AQUA');
        msg.channel.send({ embeds: [embed] });
        break;
    }
  },
});