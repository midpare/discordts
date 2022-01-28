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