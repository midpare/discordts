import request from 'request';
import { ApiType } from '../typings/Api'

export function dateCal(date: Date, days: number): string {
  const dateVariable = new Date(date);
  dateVariable.setDate(date.getDate() + days);
  const dateText = dateVariable.toString().split(/ +/);

  const monthArr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const findMonth = monthArr.find(element => element == dateText[1]);


  const monthName = findMonth != undefined ? findMonth : '';
  const monthIndex = monthArr.indexOf(monthName) + 1;
  const month = monthIndex >= 10 ? monthIndex.toString() : '0' + monthIndex.toString();
  const day = dateText[3] + month + dateText[2];

  return day;
}

export async function requestGet(option: ApiType): Promise<any> {
  return new Promise((resolve, reject) => {
    request(option, (err: string, res: any, body: string) => {
      if (err)
        reject(err);
      else
        resolve(body);
    });
  });
}

export function shuffle(arr: Array<any>): typeof arr {
  const shuffleArr = new Array();
  while (arr.length) {
    const roll = Math.floor(Math.random() * arr.length);
    shuffleArr.push(arr.splice(roll, 1)[0]);
  }
  return shuffleArr;
}

export function xor(a: any, b: any) {
  return ((a || b) && !(a && b));
}