import { User, Message, Snowflake } from "discord.js";
import { gambling } from "../../models/gambling";
import { ExtendMessage } from "../types/command";

export class Betting {
  public readonly title: string;
  public readonly bet1: BetNode;
  public readonly bet2: BetNode;
  
  constructor(title: string, name1: string, name2: string) {
    this.title = title
    this.bet1 = new BetNode(name1);
    this.bet2 = new BetNode(name2);
  }

  get persent(): Record<string, number> {
    const returner: Record<string, number> = {
      bet1: 0,
      bet2: 0,
    };
    if (this.bet1.sum == 0 && this.bet2.sum == 0)
      return returner;
    
    const persent = (this.bet1.sum / (this.bet1.sum + this.bet2.sum) * 100);
    returner.bet1 = persent;
    returner.bet2 = 100 - persent;
    return returner
  }

  get times(): Record<string, number> { 
    const returner: Record<string, number> = {
      bet1: 0,
      bet2: 0,
    };

    if (this.bet1.sum != 0)
      returner.bet1 = 100 / (this.persent.bet1)

    if (this.bet2.sum != 0)
      returner.bet2 = 100 / (this.persent.bet2)

    return returner;
  }

  public async end(winner: 'bet1' | 'bet2'): Promise<void> {
    const winnerNode = this[winner];

    for (const user of winnerNode.user) {
      const id = user.id;
      const result = user.money * this.times[winner];
      (await gambling.updateOne({ id }, { $inc: { money: result } })).matchedCount;
    }
  }
}

export class BetNode {
  public readonly name: string;
  public readonly user: Array<{
    id: Snowflake;
    money: number;
  }>;

  constructor(name: string) {
    this.name = name;
    this.user = new Array();
  }

  public async addUser(msg: ExtendMessage, bettor: User, money: number): Promise<Message<boolean> | void> {
    const id = bettor.id;
    const name = bettor.username;
    const user = await gambling.findOne({ id });

    if (money > user.money)
      return msg.reply(`자신의 돈보다 많은돈은 입력해실 수 없습니다. \n현재 잔액: ${user.money.toLocaleString()}원`);

    const posArr = this.user.find((element: { id: Snowflake }) => element.id = id);
    if (!posArr) {
      this.user.push({ id, money });
      msg.reply(`${name}님이 "${this.name}"에 ${money.toLocaleString()}원을 베팅했습니다! \n현재잔액 ${user.money.toLocaleString()}원 -> ${(user.money - money).toLocaleString()}원`);
    } else {
      if (posArr.money + money < 0)
        return msg.reply(`베팅액보다 큰 금액을 뺄 수는 없습니다 \n현재 베팅액: ${posArr.money.toLocaleString()}`);
      posArr.money += money;
      msg.reply(`${name}님이 "${this.name}"에 ${money.toLocaleString()}원을 추가로 베팅했습니다! \n현재 베팅액: ${(posArr.money - money).toLocaleString()}원 -> ${posArr.money.toLocaleString()}원 \n현재 잔액 ${user.money.toLocaleString()}원 -> ${(user.money - money).toLocaleString()}원`);
    }
    (await gambling.updateOne({ id }, { $inc: { money: - money } })).matchedCount;
  }

  get sum(): number {
    let result: number = 0;
    for (const user of this.user) {
      result += user.money;
    }

    return result
  }
}