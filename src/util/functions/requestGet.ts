import request from 'request';

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

export interface ApiType {
  uri: string;
  method: string;
  json: boolean;
  qs?: object;
}