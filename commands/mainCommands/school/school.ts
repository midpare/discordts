import { MessageEmbed } from 'discord.js'
import { school } from '../../../models/school'
import { commandType } from '../../../typings/command'
import { dateCal, requestGet } from '../../../handler/function'

const apiKey = process.env.SCHOOL_API_KEY || ''
const OOE: any = {'서울특별시' : 'B10', '부산광역시': 'C10', '대구광역시': 'D10', '인천광역시': 'E10', '광주광역시': 'F10', '대전광역시': 'G10', '울산광역시': 'H10', '세종특별자치시': 'I10', '경기도': 'J10', '강원도': 'K10', '충청북도' : 'M10', '충청남도': 'N10', '전라북도': 'P10', '전라남도': 'Q10', '경상북도': 'R10', '경상남도': 'S10', '제주특별자치도': 'T10'}

interface schoolApiType {
  readonly uri: string
  readonly qs: qs
}

interface qs {
  KEY: string
  ATPT_OFCDC_SC_CODE: string, 
  SD_SCHUL_CODE?: string, 
  GRADE?: string, 
  CLASS_NM?: string,
  SCHUL_NM?: string
  ALL_TI_YMD?: string
  MLSV_YMD?: string
  AY?: string
}

export = <commandType> {
  name: '학교',
  execute: async ({msg, args}) => {
    if (!args[0])
      return
    const embed = new MessageEmbed()
    const id = msg.author.id
    const name = msg.author.username

    const dateVariable = new Date()
    const weekArr = ['일', '월', '화', '수', '목', '금', '토']
    const week = dateVariable.getDay()
    const findWeek = weekArr.indexOf(args[0].split('')[0])
    const weekDay = findWeek > -1 ? weekArr[findWeek] + '요일' : ''
    const user = await school.findOne({id})

    switch (args[0]) {
      case '정보등록':
        if (!args[1] || !args[2] || !args[3] || !args[4])
          return msg.reply('정확한 명령어를 입력해주시기바랍니다.\n!학교 정보등록 <시도> <학교이름(@@중학교)><학년반(1학년 2반)>')

        const schoolName = args[2]
        const grade = args[3].split('')[0]
        let classNumber: string
        const text = args[4].split('')
        !Number.isInteger(text[3]) ? classNumber = text[0] : classNumber = text[0] + text[1]

        if (!Number.isInteger(parseFloat(grade)) || !Number.isInteger(parseFloat(classNumber)))
          return msg.reply('정확한 학년반을 입력해주시기바랍니다. ex 1학년 2반')

        let cityCode: string = ''
        let cityName: string = ''
        for (let i in OOE) {
          if (args[1] == i) {
            cityCode = OOE[i]
            cityName = i
          }
        }

        if (cityCode == '')
          return msg.reply('정확한 시도위치를 입력해주시기바랍니다.')

        const basicSchoolOptions: schoolApiType = {
          uri: ' https://open.neis.go.kr/hub/schoolInfo?Type=json&Size=999',
          qs: {
            KEY: apiKey,
            ATPT_OFCDC_SC_CODE: cityCode,
            SCHUL_NM: schoolName,
          }
        }

        const basicSchool: any = await requestGet(basicSchoolOptions)
        if (basicSchool.RESULT != undefined)
          return msg.reply('입력한 정보와 일치하는 학교가 없습니다.')
        const schoolCode = basicSchool.schoolInfo[1].row[0].SD_SCHUL_CODE 

        const classOptions: schoolApiType = {
          uri: 'https://open.neis.go.kr/hub/classInfo?Type=json&Size=999',
          qs: {
            KEY: apiKey,
            ATPT_OFCDC_SC_CODE: cityCode,
            SD_SCHUL_CODE: schoolCode,
            AY: dateVariable.getFullYear().toString(),
            GRADE: grade
          }
        }

        const classInfo: any = await requestGet(classOptions)

        if (classInfo.RESULT != undefined || parseFloat(classNumber) >= classInfo.classInfo[1].row.length + 1)
          return msg.reply('입력한 반 정보와 일치하는 반이 없습니다.')

        if (!user) {
          const newSchoolInfo = new school({ id, name, cityCode, cityName, schoolCode, schoolName, grade, class: classNumber })
          newSchoolInfo.save()
          .then(() => msg.reply('성공적으로 유저 정보를 등록했습니다!'))
        } else {
          school.updateOne({id}, { $set: { cityCode, cityName, schoolCode, schoolName, grade, class: classNumber } })
          .then(() => msg.reply('성공적으로 유저 정보를 업데이트했습니다!'))
        }
        break
      case '정보확인':
        if (!user)
          return msg.reply('정보등록이 되지 않은 유저입니다.\n!학교 정보등록 <시도(서울특별시)> <학교이름(@@중학교)><학년반(1학년 2반)>\n으로 정보등록을 해주시기 바랍니다.')
        embed
          .setTitle(`${msg.author.username}님의 학교정보`)
          .setDescription(`${user.cityName} ${user.schoolName} ${user.grade}학년 ${user.class}반`)
          .setColor('GREEN')
        msg.channel.send({ embeds: [embed] })
        break
      case `${weekDay}시간표`:
        const timeTableNumber = weekDay != '' ? findWeek >= week ? findWeek - week : 7 - (week - findWeek): 0

        const timeTableDate = await dateCal(dateVariable, timeTableNumber)

        if (!user)
          return msg.reply('정보등록이 되지 않은 유저입니다.\n!학교 정보등록 <시도(서울특별시)> <학교이름(@@중학교)><학년반(1학년 2반)>\n으로 정보등록을 해주시기 바랍니다.')

        const timeTableOptions: schoolApiType = {
          uri: 'https://open.neis.go.kr/hub/misTimetable?Type=json&pSize=999',
          qs: {
            KEY: apiKey,
            ATPT_OFCDC_SC_CODE: user.cityCode,
            SD_SCHUL_CODE: user.schoolCode,
            GRADE: user.grade,
            CLASS_NM: user.class,
            ALL_TI_YMD: timeTableDate
          }
        }

        const timeTableDateSplit = timeTableDate.split('')
        const timeTableYear = timeTableDateSplit[0] + timeTableDateSplit[1] + timeTableDateSplit[2] + timeTableDateSplit[3]
        const timeTableMonth = timeTableDateSplit[4] + timeTableDateSplit[5]
        const timeTableDay = timeTableDateSplit[6] + timeTableDateSplit[7]
        const timeTable: any = await requestGet(timeTableOptions)
        if (timeTable.misTimetable == undefined || timeTable.misTimetable[1].row[0].ITRT_CNTNT === '토요휴업일') {
          embed
            .setTitle('시간표')
            .setDescription('오늘은 시간표가 없습니다.')
            .setColor('RED')
          msg.channel.send({ embeds: [embed] })
          return
        }

        embed
          .setTitle(`${weekArr[findWeek]}요일 시간표`)
          .setDescription(`${timeTableYear}-${timeTableMonth}-${timeTableDay}\n${user.grade}학년 ${user.class}반 ${user.schoolName}`)
          .setColor('GREEN')
        for (let i = 0; i < timeTable.misTimetable[1].row.length; i++) {
          embed.addField(`${i + 1}교시`, `${timeTable.misTimetable[1].row[i].ITRT_CNTNT}`)
        }
        msg.channel.send({ embeds: [embed] })
        break
      case `${weekDay}급식` || `${weekDay}급식정보`:
        const mealNumber = weekDay != '' ? findWeek >= week ? findWeek - week : 7 - (week - findWeek): 0

        const mealDate = await dateCal(dateVariable, mealNumber)
        if (!user)
          return msg.reply("정보등록이 되지 않은 유저입니다.\n!학교 정보등록 <시도(서울특별시)> <학교이름(@@중학교)><학년반(1학년 2반)>\n으로 정보등록을 해주시기 바랍니다.")

        const mealOptions: schoolApiType = {
          uri: 'https://open.neis.go.kr/hub/mealServiceDietInfo?Type=json&pSize=999',
          qs: {
            KEY: apiKey,
            ATPT_OFCDC_SC_CODE: user.cityCode,
            SD_SCHUL_CODE: user.schoolCode,
            MLSV_YMD: mealDate
          }
        }
        const meal: any = await requestGet(mealOptions)

        const mealDateSplit = mealDate.split('')
        const mealYear = mealDateSplit[0] + mealDateSplit[1] + mealDateSplit[2] + mealDateSplit[3]
        const mealMonth = mealDateSplit[4] + mealDateSplit[5]
        const mealDay = mealDateSplit[6] + mealDateSplit[7]

        embed
        .setTitle(`${weekArr[findWeek]}요일 급식`)
        .setDescription(`${mealYear}-${mealMonth}-${mealDay}(${user.schoolName})`)
        .addField('급식정보', meal.mealServiceDietInfo[1].row[0].DDISH_NM.replace(/<br\/>/gi, '\n').replace(/[0-9.]/gi, ''))
        .setColor('AQUA')
        msg.channel.send({ embeds: [embed] })
        break
    }
  }
}