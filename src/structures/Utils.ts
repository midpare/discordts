import { GuildMember } from 'discord.js';
import request from 'request';

export interface ApiType {
  uri: string;
  method: string;
  json: boolean;
  qs?: object;
}

export class Utils {
  static dateCal(date: Date, days: number): string {
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

  static findBot(users: Array<GuildMember>): boolean {
    for(const user of users) {
      if (user.user.bot)
        return true;
    }
    return false
  }

  static async requestGet(option: ApiType): Promise<any> {
    return new Promise((resolve, reject) => {
      request(option, (err: string, res: any, body: string) => {
        if (err)
          reject(err);
        else
          resolve(body);
      });
    });
  } 

  static shuffle<T>(arr: Array<T>): Array<T> {
    for (let i = 0; i < arr.length; i++) {
      const ranIdx = Math.floor(Math.random() * (arr.length - i)) + i;
      const prev = arr[i];
      arr[i] = arr[ranIdx];
      arr[ranIdx] = prev;
    }
    return arr;
  }
}