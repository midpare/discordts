import { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, Message, MessageEditOptions, Snowflake } from "discord.js";
import { Client } from "../../structures/Client";
import { InteractionOption } from "../../structures/InteractionOptions";
import { Utils } from "../../structures/Utils";

const table = [
  { success: 990, fail: 0, breaking: 10, money: 80000, sell: 20000 },
  { success: 900, fail: 100, breaking: 0, money: 120000, sell: 80000 },
  { success: 850, fail: 150, breaking: 0, money: 270000, sell: 250000 },
  { success: 800, fail: 200, breaking: 0, money: 520000, sell: 500000 },
  { success: 550, fail: 400, breaking: 50, money: 660000, sell: 1700000 },
  { success: 450, fail: 450, breaking: 100, money: 970000, sell: 2500000 },
  { success: 300, fail: 600, breaking: 100, money: 1200000, sell: 4400000 },
  { success: 200, fail: 650, breaking: 150, money: 1600000, sell: 7000000 },
  { success: 100, fail: 500, breaking: 400, money: 1900000, sell: 10000000 },
  { success: 50, fail: 400, breaking: 550, money: 260000, sell: 17000000 },
];

interface Table {
  success: number
  fail: number
  breaking: number
  money: number
  sell: number
}

export class Enforce {
  public readonly client: Client
  public readonly id: Snowflake;
  public readonly guildId: Snowflake;
  public readonly itemName: string;
  public rank: number;
  public protection: boolean;
  public increaseChance: boolean;
  public message: Message
  public enforceTable: Array<Table> = table

  constructor(client: Client, data: InteractionOption, itemName: string, rank: number, message: Message) {
    this.client = client
    this.id = data.ids[0];
    this.guildId = data.guildId;
    this.itemName = itemName;
    this.rank = rank;
    this.protection = false;
    this.increaseChance = false;
    this.message = message
  }

  get embed(): EmbedBuilder {
    const { success, fail, breaking } = this.enforceTable[this.rank - 1];

    return new EmbedBuilder()
      .setTitle(`${this.itemName} 강화메뉴`)
      .setDescription(`성공확률: ${success / 10}%, 실패확률: ${fail / 10}%, 파괴확률: ${breaking / 10}%`)
      .setFields([
        { name: '강화횟수', value: `${this.rank}강`, inline: true },
        { name: '파괴방지권', value: this.protection ? '사용 중' : '미 사용', inline: true },
        { name: '확률증가권', value: this.increaseChance ? '사용 중' : '미 사용', inline: true },
      ]);
  }

  get button(): ActionRowBuilder<ButtonBuilder> {
    const customIds = Utils.uuid(3);
    const [enforceId, protectionId, increaseChanceId] = customIds;

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
    );
  }

  async send(options: MessageEditOptions) {
    this.message = await this.message.edit(options);
  }
}