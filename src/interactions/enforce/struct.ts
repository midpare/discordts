import { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, Message, MessageEditOptions, Snowflake } from "discord.js";
import { Client } from "../../structures/Client";
import { InteractionOption } from "../../structures/InteractionOptions";
import { Utils } from "../../structures/Utils";

const table = [
  { success: 95, fail: 4, breaking: 1, money: 10000 },
  { success: 90, fail: 8, breaking: 2, money: 20000 },
  { success: 85, fail: 10, breaking: 5, money: 50000 },
  { success: 80, fail: 13, breaking: 7, money: 80000 },
  { success: 70, fail: 20, breaking: 10, money: 100000 },
  { success: 60, fail: 28, breaking: 12, money: 150000 },
  { success: 50, fail: 35, breaking: 15, money: 200000 },
  { success: 40, fail: 43, breaking: 17, money: 300000 },
  { success: 30, fail: 50, breaking: 20, money: 500000 },
];

interface Table {
  success: number
  fail: number
  breaking: number
  money: number
}

export class Enforce {
  public readonly client: Client
  public readonly id: Snowflake;
  public readonly guildId: Snowflake;
  public readonly itemName: string;
  public readonly enforceTable: Array<Table> = table;
  public rank: number;
  public protection: boolean;
  public increaseChance: boolean;
  public message: Message;
  public balance: number;
  public totalMoney: number;

  constructor(client: Client, data: InteractionOption, itemName: string, rank: number, message: Message, balance: number) {
    this.client = client
    this.id = data.ids[0];
    this.guildId = data.guildId;
    this.itemName = itemName;
    this.rank = rank;
    this.protection = false;
    this.increaseChance = false;
    this.message = message;
    this.balance = balance;
    this.totalMoney = 0;
  }

  get embed(): EmbedBuilder {
    const { success, fail, breaking, money } = this.enforceTable[this.rank - 1];

    return new EmbedBuilder()
      .setTitle(`${this.itemName} 강화메뉴(강화비용: ${money.toLocaleString()}원)`)
      .setDescription(`성공확률: ${success}%, 실패확률: ${fail}%, 파괴확률: ${breaking}%\n잔액: ${this.balance.toLocaleString()}원, 사용한 돈: ${this.totalMoney.toLocaleString()}원`)
      .setFields([
        { name: '강화횟수', value: `${this.rank}강`, inline: true },
        { name: '파괴방지권', value: this.protection ? '사용 중' : '미 사용', inline: true },
        { name: '확률증가권', value: this.increaseChance ? '사용 중' : '미 사용', inline: true },
      ]);
  }

  get button(): ActionRowBuilder<ButtonBuilder> {
    const customIds = Utils.uuid(4);
    const [enforceId, protectionId, increaseChanceId, cancelId] = customIds;

    const defaultOption = {
      ids: [this.id],
      guildId: this.guildId,
      messages: [this.message],
      customIds,
      data: {
        enforce: this,
      }
    }

    this.client.interactionOptions.set(enforceId, new InteractionOption(Object.assign({}, { cmd: 'enforce' }, defaultOption)))
    this.client.interactionOptions.set(protectionId, new InteractionOption(Object.assign({}, { cmd: 'protection' }, defaultOption)));
    this.client.interactionOptions.set(increaseChanceId, new InteractionOption(Object.assign({}, { cmd: 'increaseChance' }, defaultOption)));
    this.client.interactionOptions.set(cancelId, new InteractionOption(Object.assign({}, { cmd: 'enforce_end' }, defaultOption)));

    return <ActionRowBuilder<ButtonBuilder>>new ActionRowBuilder().setComponents(
      new ButtonBuilder()
        .setCustomId(enforceId)
        .setStyle(ButtonStyle.Primary)
        .setLabel('강화'),
      new ButtonBuilder()
        .setCustomId(protectionId)
        .setStyle(ButtonStyle.Primary)
        .setLabel(this.protection ? '파괴방지권 해제' : '파괴방지권 사용'),
      new ButtonBuilder()
        .setCustomId(increaseChanceId)
        .setStyle(ButtonStyle.Primary)
        .setLabel(this.increaseChance ? '확률증가권 해제' : '확률증가권 사용'),
      new ButtonBuilder()
        .setCustomId(cancelId)
        .setStyle(ButtonStyle.Secondary)
        .setLabel('종료')
    );
  }

  async send(options: MessageEditOptions) {
    this.message = await this.message.edit(options);
  }
}