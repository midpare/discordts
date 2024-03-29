import { ButtonInteraction, ChatInputCommandInteraction, GuildMember, StringSelectMenuInteraction } from 'discord.js';
import request from 'request';
import fs from 'fs';
import { CanvasRenderingContext2D, Image } from 'canvas';

export class Utils {
  public static dateCal(date: Date, days: number): string {
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

  public static findBot(users: Array<GuildMember>): boolean {
    for (const user of users) {
      if (user.user.bot)
        return true;
    }
    return false
  }

  public static async request(
    option: {
      uri: string;
      method: string;
      json: boolean;
      qs?: object;
    }
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      request(option, (err, _, body) => {
        if (err)
          reject(err);
        else
          resolve(body);
      });
    });
  }

  public static shuffle<T>(arr: Array<T>): Array<T> {
    for (let i = 0; i < arr.length; i++) {
      const ranIdx = Math.floor(Math.random() * (arr.length - i)) + i;
      const prev = arr[i];
      arr[i] = arr[ranIdx];
      arr[ranIdx] = prev;
    }
    return arr;
  }

  public static uuid(): string;
  public static uuid(count: number): Array<string>

  public static uuid(count?: number): string | Array<string> {
    if (!count) {
      let message = '';
      for (let i = 0; i < 12; i++) {
        if (i % 2 == 0 && i > 0 && i < 9) {
          message = message + '-';
        } else {
          message = message + (Math.floor((Math.random() + 1) * 0x10000)).toString(16).substring(1);
        }
      }

      return message;
    } else {
      const box: Array<string> = new Array();
      for (let i = 0; i < count; i++) {
        box.push(Utils.uuid());
      }

      return box;
    }
  }

  public static getPath(arr: Array<string>, basePath: string) {
    const files = fs.readdirSync(basePath, { withFileTypes: true })
    for (const file of files) {
      const path = `${basePath}/${file.name}`;
      if (file.isDirectory()) {
        Utils.getPath(arr, path)
      } else {
        arr.push(path);
      }
    }
  }

  public static async reply(interaction: ChatInputCommandInteraction | ButtonInteraction | StringSelectMenuInteraction, options: string): Promise<void> {
    interaction.reply(options);
    const replied = await interaction.fetchReply();
    setTimeout(() => {
      replied.delete();
    }, 3000);
  }

  public static getTime(time: number): string {
    const day = time % (24 * 60 * 60 * 1000);
    const hour = time % (60 * 60 * 1000);
    const minute = time % (60 * 1000);
    const second = time % 1000;

    let result = `${second}초`;

    if (minute > 0)
      `${minute}분 ` + result;
    else if (hour > 0)
      `${hour}시간 ${minute}분 ` + result;
    else if (day > 0)
      `${day}일 ${hour}시간 ${minute}분 ` + result;

    return result;
  }

  public static packing<T>(arr: Array<T>, n: number): Array<Array<T>> {
    const box = this.matrix(Math.ceil(arr.length / n), n)
    for (let i in arr) {
      const j = parseInt(i);
      box[Math.floor(j / n)][j % n] = arr[i];
    }
    box[box.length - 1] = box[box.length - 1].filter(e => e);

    return box;
  }

  public static matrix<T>(m: number, n: number, initial?: T): any[][] {
    const matrix = new Array();
    for (let i = 0; i < m; i += 1) {
      const arr = new Array();
      if (initial != undefined) {
        for (let j = 0; j < n; j += 1) {
          arr.push(initial);
        }
      }
      matrix.push(arr);
    }
    return matrix;
  };

  public static getImage(ctx: CanvasRenderingContext2D, buffer: Buffer) {
    const image = new Image()
    image.onload = () => ctx.drawImage(image, 0, 0)
    image.onerror = err => { throw err }
    image.src = buffer;

    return image;
  }
}