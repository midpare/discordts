import { ChannelManager, Client, ClientUser, Collection } from 'discord.js'
import { CommandType } from '../util/types/command'
import { InteractionType } from '../util/types/interaction'
import mongoose from 'mongoose'

export class ExtendClient extends Client {
  public user!: ClientUser;
  public channels!: ChannelManager;
  
  commands: Collection<string, CommandType>;
  interactions: Collection<string, InteractionType>;
  coin: Collection<string, string>;
  sdCode: Collection<string, string>;

  constructor() {
    super({ intents: 32767 });
    this.commands = new Collection();
    this.interactions = new Collection();
    this.coin = new Collection();
    this.sdCode = new Collection();
  }

  async start() {
    this.handler();
    this.setSchool();
    super.login(process.env.TOKEN);
    mongoose.connect(process.env.DB_URI + '/discordbot');
  }

  async handler() {
    const path = new Array('commands', 'interactions', 'events', 'intervals', 'app')
    for (const dir of path) {
      require(`../handler/${dir}`)(this);
    }
  }

  setSchool() {
    const sds = ['서울특별시', '부산광역시',
      '대구광역시', '인천광역시',
      '광주광역시', '대전광역시',
      '울산광역시', '세종특별자치시',
      '경기도', '강원도',
      '충청북도', '충청남도',
      '전라북도', '전라남도',
      '경상북도', '경상남도',
      '제주특별자치도'];
    const sdCodes = ['B10', 'C10', 'D10',
      'E10', 'F10', 'G10',
      'H10', 'I10', 'J10',
      'K10', 'M10', 'N10',
      'P10', 'Q10', 'R10',
      'S10', 'T10'];
    for (let i = 0; i < sds.length; i++) {
      this.sdCode.set(sds[i], sdCodes[i]);
    }
  }
}

export const client = new ExtendClient();

