import { ButtonInteraction, ChatInputCommandInteraction, GuildMember } from 'discord.js';
import request from 'request';
import fs from 'fs';

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

  public static async reply(interaction: ChatInputCommandInteraction | ButtonInteraction, options: string): Promise<void> {
    interaction.reply(options);
    const replied = await interaction.fetchReply();
    setTimeout(() => {
      replied.delete();
    }, 3000);
  }
}