import { ExtendClient } from "../clients/client"

export = async (client: ExtendClient) => {
  const sds = ['서울특별시', '부산광역시',
    '대구광역시', '인천광역시',
    '광주광역시', '대전광역시',
    '울산광역시', '세종특별자치시',
    '경기도', '강원도',
    '충청북도', '충청남도',
    '전라북도', '전라남도',
    '경상북도', '경상남도',
    '제주특별자치도']
  const sdCodes = ['B10', 'C10', 'D10',
    'E10', 'F10', 'G10',
    'H10', 'I10', 'J10',
    'K10', 'M10', 'N10',
    'P10', 'Q10', 'R10',
    'S10', 'T10']
  for (let i = 0; i < sds.length; i++) {
    client.sdCode.set(sds[i], sdCodes[i])
  }
}

