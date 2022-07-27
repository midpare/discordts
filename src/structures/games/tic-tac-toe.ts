import { GuildMember, Message } from "discord.js"

export class TicTacToe {
  public readonly table: Array<Array<number>>;
  public player: Array<GuildMember>;
  public turn: GuildMember;
  public flag: number

  constructor(player: Array<GuildMember>) {
    this.table = [
      [0, 0, 0,],
      [0, 0, 0,],
      [0, 0, 0,],
    ];
    this.player = player
    this.flag = 1;
    this.turn = player[0]
  }

  public set(position: Array<number>): GuildMember | null {
    const [x, y] = position;

    this.table[x][y] = this.flag;

    this.flag = ((this.flag - 1) ^ 1) + 1;
    this.turn = this.player[this.flag - 1];
    return this.checkWin();
  }

  private checkWin(): GuildMember | null {
    const winPositions = [
      [[0,0], [0,1], [0,2]],
      [[1,0], [1,1], [1,2]],
      [[2,0], [2,1], [2,2]],
      [[0,0], [1,0], [2,0]],
      [[0,1], [1,1], [2,1]],
      [[0,2], [1,2], [2,2]],
      [[0,0], [1,1], [2,2]],
      [[0,2], [1,1], [2,0]],
    ];

    for (const position of winPositions) {
      const value = new Array();
      for (const [x,y] of position) {
        value.push(this.table[x][y])
      }
      if (value[0] != 0 && value[0] == value[1] && value[1] == value[2]) {
        return this.player[value[0] - 1];
      }
    }
    return null
  }
}