import { AudioPlayer, AudioPlayerStatus, AudioResource, VoiceConnection, createAudioResource } from "@discordjs/voice";
import { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, italic, Message, APISelectMenuOption } from "discord.js";
import { stream } from "play-dl";

export class Music {
  public currunt: Data | null;
  public queue: Array<Data>;
  public player: AudioPlayer;
  public connection: VoiceConnection;
  public message: Message;

  constructor(connection: VoiceConnection, player: AudioPlayer, message: Message) {
    this.currunt = null;
    this.queue = new Array();
    this.player = player;
    this.connection = connection;
    this.message = message;

    this.player.on(AudioPlayerStatus.Idle, async () => {
      const data = this.queue.shift();
      if (!data) {
        this.currunt = null;
        this.connection.destroy();
      } else {
        this.currunt = data;
        const resource = await this.getResource(data)
        this.player.play(resource);
      }
      
      this.message.edit({ embeds: [this.embed], components: [this.button] });
    });
  }

  public async pushData(data: Data) {
    if (!this.currunt) {
      this.currunt = data;
      
      const resource = await this.getResource(data);
      this.player.play(resource);
      this.connection.subscribe(this.player);
    } else 
      this.queue.push(data);
    

    this.message.edit({ embeds: [this.embed], components: [this.button] });
  }

  public async getResource(data: Data): Promise<AudioResource> {
    const audio = await stream(data.url, { quality: 0 });

    return createAudioResource(audio.stream);
  }

  public delete(i: number) {
    if (i < 1) {
      this.player.stop();
    } else {
      this.queue.splice(i - 1, 1);
      this.message.edit({ embeds: [this.embed], components: [this.button] });
    }
  }

  public get button(): ActionRowBuilder<ButtonBuilder> {
    return new ActionRowBuilder<ButtonBuilder>().setComponents(
      new ButtonBuilder()
        .setCustomId('select delete')
        .setStyle(ButtonStyle.Primary)
        .setLabel('노래 삭제'),
      new ButtonBuilder()
        .setCustomId('connect music')
        .setStyle(ButtonStyle.Primary)
        .setLabel('연결'),
    );
  }

  public get embed(): EmbedBuilder {
    const embed = new EmbedBuilder()
      .setTitle('재생목록')
      .setDescription('현재 재생목록을 확인합니다.\n채팅으로 제목을 입력해 노래를 추가할 수 있습니다.');
    if (this.currunt == null)
      return embed;

    const fields = new Array();

    const copy = this.queue.slice();
    copy.unshift(this.currunt);
    for (const i in copy) {
      const { title, search, requestBy, duration } = copy[i];
      const field = {
        name: `${parseInt(i) + 1}, ${search}`,
        value: `(${duration}) ${title} ${italic(`by ${requestBy}`)}`,
        inline: false,
      };
      fields.push(field);
    }
    return embed.setFields(fields);
  }


  public get selectMenuOption(): Array<APISelectMenuOption> {
    if (!this.currunt) 
      return []
    const copy = this.queue.slice();
    copy.unshift(this.currunt);

    const options = copy.map((e, i) => {
      const { title, search, requestBy, duration } = e
      return {
        label: `${i + 1}, ${search}`,
        description: `(${duration}) ${title} ${italic(`by ${requestBy}`)}`,
        value: i.toString(),
      }
    });
    return options;
  }
}

interface Data {
  url: string;
  title: string;
  search: string;
  duration: string;
  requestBy: string;
}