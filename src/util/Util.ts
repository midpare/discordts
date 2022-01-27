import { GuildMember } from 'discord.js';
import request from 'request';
import { ApiType } from './typings/api';

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

export function findBot(users: Array<GuildMember>): boolean {
  for(const user of users) {
    if (user.user.bot)
      return true;
  }
  return false
}