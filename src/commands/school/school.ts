import { EmbedBuilder, Colors, ApplicationCommandOptionType } from 'discord.js';
import { Command } from '../../managers/Command';
import { Utils } from '../../structures/Utils';

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

export default new Command({
  name: '학교',
  category: '학교',
  usage: '학교',
  description: '학교 관련 명령어를 사용합니다.',
  options: [
    {
      name: '정보',
      description: '학교에 관한 정보를 입력합니다.',
      type: ApplicationCommandOptionType.String,
      required: true,
      choices,
    },
  ],
  execute: async ({ interaction, options, client }) => {
    const apiKey = process.env.SCHOOL_API_KEY || '';

    const embed = new EmbedBuilder();
    const { guildId, user: { id } } = interaction;

    const user = await client.models.school.findOne({ id, guildId });

    if (!user) {
      Utils.reply(interaction, '학교등록이 되지 않은 유저입니다.', true);
      return 0;
    }
    interaction.deferReply()

    const info = options.getString('정보', true);

    const dateVariable = new Date();
    const week = dateVariable.getDay();
    const findWeek = weekArr.indexOf(info[0]) + 1;
    const weekDay = info.slice(0, 3);
    const dayNext = findWeek >= week ? findWeek - week : 7 - (week - findWeek); 

    if (info.endsWith('시간표')) {
      const timeTableDate = Utils.dateCal(dateVariable, dayNext);

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
      const timeTable = JSON.parse(await Utils.request(timeTableOptions));

      if (timeTable.misTimetable == undefined || timeTable.misTimetable[1].row[0].ITRT_CNTNT === '토요휴업일') {
        embed
          .setTitle('시간표')
          .setDescription('이날은 시간표가 없습니다.')
          .setColor(Colors.Red);
        interaction.editReply({ embeds: [embed] });
      } else {
        embed
          .setTitle(info)
          .setDescription(`${timeTableYear}-${timeTableMonth}-${timeTableDay}\n${user.grade}학년 ${user.class}반 ${user.schoolName}`)
          .setColor(Colors.Green);
        for (let i = 0; i < timeTable.misTimetable[1].row.length; i++) {
          embed.addFields({ name: `${i + 1}교시`, value: `${timeTable.misTimetable[1].row[i].ITRT_CNTNT}`, inline: false });
        }
        interaction.editReply({ embeds: [embed] });
      }
    } else if (info.endsWith('급식')) {
      const mealDate = Utils.dateCal(dateVariable, dayNext);

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

      const meal = JSON.parse(await Utils.request(mealOptions));

      if (meal.RESULT != undefined) {
        embed
          .setTitle('급식')
          .setDescription('이날은 급식이 없습니다.')
          .setColor(Colors.Red);
        interaction.editReply({ embeds: [embed] });
      } else {
        const mealYear = mealDate[0] + mealDate[1] + mealDate[2] + mealDate[3];
        const mealMonth = mealDate[4] + mealDate[5];
        const mealDay = mealDate[6] + mealDate[7];
  
        embed
          .setTitle(`${weekDay} 급식`)
          .setDescription(`${mealYear}-${mealMonth}-${mealDay}(${user.schoolName})`)
          .addFields({ name: '급식정보', value: meal.mealServiceDietInfo[1].row[0].DDISH_NM.replace(/<br\/>/gi, '\n').replace(/[0-9.]/gi, ''), inline: false })
          .setColor(Colors.Aqua);
        interaction.editReply({ embeds: [embed] });
      }
    }
    return 1;
  },
});