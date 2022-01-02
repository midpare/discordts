import { CommandType } from "../../../typings/command";
import { school } from '../../../models/school'
import { requestGet } from "../../../handler/function";
import { client } from "../../../contexts/client";

export = <CommandType> {
  name: '정보등록',
  category: 'school',
  usage: '정보등록 <시도> <학교이름(@@중학교)><학년반(1학년 2반)>',
  description: '자신의 학교정보를 등록해 학교 명령어 사용을 가능하게합니다.',
  execute: async ({msg, args}) => {
    if (!args[1] || !args[2] || !args[3] || !args[4])
      return msg.reply('정확한 명령어를 입력해주시기바랍니다.\n!학교 정보등록 <시도> <학교이름(@@중학교)><학년반(1학년 2반)>')

    const apiKey = process.env.SCHOOL_API_KEY || ''
    const id = msg.author.id
    const name = msg.author.username
    const user = await school.findOne({id})
    const date = new Date()
    const schoolName = args[2]
    const grade = args[3].split('')[0]
    const text = args[4].split('')
    const classNumber = !Number.isInteger(text[3]) ? text[0] : text[0] + text[1]

    if (!Number.isInteger(parseFloat(grade)) || !Number.isInteger(parseFloat(classNumber)))
      return msg.reply('정확한 학년반을 입력해주시기바랍니다. ex 1학년 2반')

    const cityCode = client.sdCode.get(args[1])
    const cityName = args[1]

    if (!cityCode)
      return msg.reply('정확한 시도위치를 입력해주시기바랍니다.')

    const basicSchoolOptions = {
      uri: ' https://open.neis.go.kr/hub/schoolInfo?Type=json&Size=999',
      qs: {
        KEY: apiKey,
        ATPT_OFCDC_SC_CODE: cityCode,
        SCHUL_NM: schoolName,
      },
      method: 'GET',
      json: false
    }

    const basicSchool = JSON.parse(await requestGet(basicSchoolOptions))
    if (basicSchool.RESULT != undefined)
      return msg.reply('입력한 정보와 일치하는 학교가 없습니다.')
    const schoolCode = basicSchool.schoolInfo[1].row[0].SD_SCHUL_CODE 

    const classOptions = {
      uri: 'https://open.neis.go.kr/hub/classInfo?Type=json&Size=999',
      qs: {
        KEY: apiKey,
        ATPT_OFCDC_SC_CODE: cityCode,
        SD_SCHUL_CODE: schoolCode,
        AY: date.getFullYear().toString(),
        GRADE: grade
      },
      method: 'GET',
      json: false
    }

    const classInfo = JSON.parse(await requestGet(classOptions))

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
  }
}