import { User, Message, Snowflake, Interaction, ChatInputCommandInteraction } from 'discord.js';
import { Client } from '../Client';
import { Utils } from '../Utils';

type BetName = 'bet1' | 'bet2';

export class Betting {
  public readonly starter: Snowflake;
  public readonly title: string;
  public readonly bet1: BetNode;
  public readonly bet2: BetNode;
  private readonly client: Client;
  
  constructor(starter: Snowflake, title: string, name1: string, name2: string, client: Client) {
    this.starter = starter;
    this.title = title;
    this.bet1 = new BetNode(name1, client);
    this.bet2 = new BetNode(name2, client);
    this.client = client;
  }

  get persent(): Record<BetName, number> {
    const returned = {
      bet1: 0,
      bet2: 0,
    };
    if (this.bet1.sum == 0 && this.bet2.sum == 0)
      return returned;
    
    const persent = (this.bet1.sum / (this.bet1.sum + this.bet2.sum) * 100);
    returned.bet1 = persent;
    returned.bet2 = 100 - persent;
    return returned
  }

  get times(): Record<BetName, number> { 
    const retunred = {
      bet1: 0,
      bet2: 0,
    };

    if (this.bet1.sum != 0)
      retunred.bet1 = 100 / (this.persent.bet1)

    if (this.bet2.sum != 0)
      retunred.bet2 = 100 / (this.persent.bet2)

    return retunred;
  }

  public async end(winner: BetName): Promise<void> {
    const winnerNode = this[winner];

    for (const user of winnerNode.user) {
      const id = user.id;
      const result = user.money * this.times[winner];
      (await this.client.models.gambling.updateOne({ id }, { $inc: { money: result } })).matchedCount;
    }
  }
}

export class BetNode {
  public readonly name: string;
  public readonly user: Array<{
    id: Snowflake;
    money: number;
  }>;
  private readonly client: Client

  constructor(name: string, client: Client) {
    this.name = name;
    this.user = new Array();
    this.client = client;
  }

  public async addUser(interaction: ChatInputCommandInteraction, money: number): Promise<Message<boolean> | void> {
    const { guildId, user: { id, username: name }} = interaction;
    const user = await this.client.models.gambling.findOne({ id, guildId });

    if (money > user.money)
      return Utils.reply(interaction, `자신의 돈보다 많은돈은 입력해실 수 없습니다. \n현재 잔액: ${user.money.toLocaleString()}원`);

    const posArr = this.user.find((element: { id: Snowflake }) => element.id = id);
    if (!posArr) {
      this.user.push({ id, money });
      interaction.reply(`${name}님이 '${this.name}'에 ${money.toLocaleString()}원을 베팅했습니다! \n현재잔액 ${user.money.toLocaleString()}원 -> ${(user.money - money).toLocaleString()}원`);
    } else {
      if (posArr.money + money < 0)
        return Utils.reply(interaction, `베팅액보다 큰 금액을 뺄 수는 없습니다 \n현재 베팅액: ${posArr.money.toLocaleString()}`);
      posArr.money += money;
      interaction.reply(`${name}님이 '${this.name}'에 ${money.toLocaleString()}원을 추가로 베팅했습니다! \n현재 베팅액: ${(posArr.money - money).toLocaleString()}원 -> ${posArr.money.toLocaleString()}원 \n현재 잔액 ${user.money.toLocaleString()}원 -> ${(user.money - money).toLocaleString()}원`);
    }
    (await this.client.models.gambling.updateOne({ id, guildId }, { $inc: { money: - money } })).matchedCount;
  }

  get sum(): number {
    let result: number = 0;
    for (const user of this.user) {
      result += user.money;
    }

    return result;
  }
}