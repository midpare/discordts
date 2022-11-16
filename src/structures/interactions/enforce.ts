import { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, Message, MessageEditOptions, Snowflake } from "discord.js";
import { GamblingType } from "../../models/gambling";
import { Client } from "../Client";
import { InteractionOption } from "./InteractionOptions";
import { Utils } from "../Utils";

export const enforceTable = [
  { success: 95, fail: 4, breaking: 1, money: 10000, sell: 10000 },
  { success: 90, fail: 8, breaking: 2, money: 20000, sell: 30000 },
  { success: 85, fail: 10, breaking: 5, money: 50000, sell: 80000 },
  { success: 80, fail: 13, breaking: 7, money: 80000, sell: 200000 },
  { success: 70, fail: 20, breaking: 10, money: 100000, sell: 450000 },
  { success: 60, fail: 28, breaking: 12, money: 150000, sell: 850000 },
  { success: 50, fail: 35, breaking: 15, money: 200000, sell: 2000000 },
  { success: 40, fail: 43, breaking: 17, money: 300000, sell: 4000000 },
  { success: 30, fail: 50, breaking: 20, money: 500000, sell: 10000000 },
];

interface Table {
  success: number
  fail: number
  breaking: number
  money: number
  sell: number
}

export interface Equipment {
  name: string,
  rank: number,
}

export class Enforce {
  public readonly client: Client
  public readonly id: Snowflake;
  public readonly guildId: Snowflake;
  public readonly enforceTable: Array<Table> = enforceTable;
  public equipment: Equipment
  public protection: boolean;
  public increaseChance: boolean;
  public message: Message
  public money: number;

  constructor(client: Client, data: InteractionOption<null>, itemName: string, user: GamblingType) {
    const equipment = user.equipments.filter(e => e.name == itemName)[0];

    this.client = client
    this.id = data.ids[0];
    this.guildId = data.guildId;
    this.equipment = equipment;
    this.protection = false;
    this.increaseChance = false;
    this.money = user.money;
    this.message = data.messages[0];
  }

  get embed(): EmbedBuilder {
    const { success, fail, breaking, money } = this.enforceTable[this.equipment.rank - 1];

    const sell = this.equipment.rank < 2 ? '없음' : this.enforceTable[this.equipment.rank - 2].sell.toLocaleString() + '원'
    return new EmbedBuilder()
      .setTitle(`"${this.equipment.name}" 강화메뉴(강화비용: ${money.toLocaleString()}원)`)
      .setDescription(`성공확률: ${success}%, 실패확률: ${fail}%, 파괴확률: ${breaking}%\n잔액: ${this.money.toLocaleString()}원, 판매비용: ${sell}`)
      .setFields([
        { name: '강화횟수', value: `${this.equipment.rank}강`, inline: true },
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
      data: this,
    }

    this.client.interactionOptions.set(enforceId, new InteractionOption(Object.assign({}, defaultOption, { cmd: 'enforce' })))
    this.client.interactionOptions.set(protectionId, new InteractionOption(Object.assign({}, defaultOption, { cmd: 'protection' })));
    this.client.interactionOptions.set(increaseChanceId, new InteractionOption(Object.assign({}, defaultOption, { cmd: 'increaseChance' })));
    this.client.interactionOptions.set(cancelId, new InteractionOption(Object.assign({}, defaultOption, { cmd: 'enforce_end' })));

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

  public async send(options: MessageEditOptions) {
    this.message = await this.message?.edit(options);
  }
}

