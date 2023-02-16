import { Canvas, CanvasRenderingContext2D, createCanvas, Image } from "canvas"
import { ActionRowBuilder, AttachmentBuilder, ButtonBuilder, ButtonStyle, GuildMember, Message, bold, EmbedBuilder } from "discord.js";
import { Utils } from "../Utils";
import { Client } from "../Client";
import { InteractionOption } from "./InteractionOptions";

export class Gomoku {
  client: Client;

  image: Image;
  canvas: Canvas;
  ctx: CanvasRenderingContext2D;

  players: Array<GuildMember>;
  turn: boolean;
  customIds: Array<string>;
  matrix: number[][];

  constructor(client: Client, image: Image, players: Array<GuildMember>) {
    this.client = client;

    this.image = image;

    this.canvas = createCanvas(1172, 1172);

    this.ctx = this.canvas.getContext('2d');
    this.ctx.drawImage(this.image, 0, 0);

    this.players = players;
    this.turn = true;
    this.matrix = Utils.matrix(15, 15, 0);
    this.customIds = new Array();
  }

  public setRock(i: number, j: number) {
    this.ctx.beginPath();
    this.ctx.fillStyle = this.turn ? 'black' : 'white';
    this.ctx.ellipse(53 + 75.5 * i, 53 + 75.5 * j, 30, 30, 0, 0, 2 * Math.PI);
    this.ctx.fill();

    this.matrix[i][j] = this.turn ? 1 : 2;
    this.turn = !this.turn;
  }

public checkWin(): number {
  const m = this.matrix;

  for (let i = 0; i < 15; i++) {
    for (let j = 0; j < 15; j++) {
      if (!m[i][j] && !m[i][j + 4])
        continue;

      const dir = new Array(4).fill(0)
      for (let k = 1; k < 5; k++) {
        if (m[i][j]) {
          if (i < 11 && m[i][j] == m[i + k][j])
            dir[0]++;
          else if (j < 11 && m[i][j] == m[i][j + k])
            dir[1]++;
          else if ((i < 11 && j < 11) && m[i][j] == m[i + k][j + k])
            dir[2]++;
        } else if (m[i][j + 4]) {
          if ((i < 11 && j < 11) && m[i][j + 4] == m[i + k][j + 4 - k]) {
            dir[3]++;
          }
        }
      }
      for (const i in dir) {
        const winner = dir[i];
        if (winner == 4) 
          return 1;
      }
    }
  }
  return 0;
}

  public setInteractionOptions(message: Message) {
    const defaultOption = {
      ids: this.turn ? [this.players[0].id] : [this.players[1].id],
      guildId: this.players[0].guild.id,
      customIds: this.customIds.slice(),
      message,
      data: null,
    };

    this.client.interactionOptions.set(this.customIds[0], new InteractionOption(Object.assign({}, defaultOption, { cmd: 'gomoku selectPosition' })));
  }

  get embed(): EmbedBuilder {
    const users = this.players.map(e => bold(e.displayName))
    const embed = new EmbedBuilder()
      .setTitle(`${users[0]} VS ${users[1]}`)
      .setDescription(`${this.turn ? users[0] : users[1]}님의 턴입니다!`)
      .setImage('attachment://gomoku.png');

    return embed;
  }

  get file(): AttachmentBuilder {
    return new AttachmentBuilder(this.canvas.toBuffer('image/png')).setName('gomoku.png');
  }

  get components(): ActionRowBuilder<ButtonBuilder>[] {
    const components = new Array();
    const customIds = Utils.uuid(2);

    components.push(new ActionRowBuilder().setComponents(
      new ButtonBuilder()
        .setCustomId(customIds[0])
        .setLabel('착수')
        .setStyle(ButtonStyle.Secondary),
      new ButtonBuilder()
        .setCustomId(customIds[1])
        .setLabel('무르기')
        .setStyle(ButtonStyle.Secondary),
    ));

    this.customIds = customIds;
    return components;
  }
}