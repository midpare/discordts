import request from 'request'

export async function dateCal(date: Date, days: number) {
  const dateVariable = new Date(date)
  dateVariable.setDate(date.getDate() + days)
  const dateText = dateVariable.toString().split(/ +/)

  const monthArr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const findMonth = monthArr.find(element => element == dateText[1])

  let monthName: string
  if (findMonth != undefined)
    monthName = findMonth
  else
    monthName = ''

  const monthIndex = monthArr.indexOf(monthName) + 1
  const month = monthIndex >= 10 ? monthIndex.toString() : '0' + monthIndex.toString()
  const day = dateText[3] + month + dateText[2]

  return day
}

interface apiType {
  uri: string
  qs?: object
}

export async function requestGet(option: apiType): Promise<unknown> {
  return new Promise((resolve, reject) => {
    request.get(option, (err: string, res: any, body: string) => {
      if(err)
        reject(err)
      else 
        resolve(JSON.parse(body))
    })
  })
}