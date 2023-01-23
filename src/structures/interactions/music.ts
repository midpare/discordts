import { AudioPlayer, AudioPlayerStatus, AudioResource, VoiceConnection, createAudioResource, VoiceConnectionStatus, entersState } from "@discordjs/voice";
import { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, Message } from "discord.js";
import ytdl from "ytdl-core";

export class Music {
  private currunt: Data | null;
  private queue: Array<Data>;
  private player: AudioPlayer;
  private connection: VoiceConnection;
  private message: Message;

  constructor(connection: VoiceConnection, player: AudioPlayer, message: Message) {
    this.currunt = null;
    this.queue = new Array();
    this.player = player;
    this.connection = connection;
    this.message = message;

    this.player.on(AudioPlayerStatus.Idle, () => {
      const data = this.nextData;
      if (!data) {
        this.currunt = null;
        this.connection.destroy();
      } else {
        this.currunt = data;
        this.player.play(this.getResource(data));
      }

      this.message.edit({ embeds: [this.embed], components: [this.button] });
    });

    this.connection.on(VoiceConnectionStatus.Disconnected, (oldstate, newstate) => {
      connection.destroy();
    })
  }

  public pushData(data: Data) {
    if (!this.currunt) {
      this.currunt = data;
      this.player.play(this.getResource(data));
      this.connection?.subscribe(this.player);
    } else {
      this.queue.push(data);
    }

    this.message.edit({ embeds: [this.embed], components: [this.button] });
  }

  private get nextData(): Data | undefined {
    return this.queue.shift();
  }

  private get button(): ActionRowBuilder<ButtonBuilder> {
    return <ActionRowBuilder<ButtonBuilder>>new ActionRowBuilder().setComponents(
      new ButtonBuilder()
        .setCustomId('add music')
        .setStyle(ButtonStyle.Primary)
        .setLabel('노래 추가'),
      new ButtonBuilder()
        .setCustomId('delete music')
        .setStyle(ButtonStyle.Primary)
        .setLabel('노래 삭제'),
      new ButtonBuilder()
        .setCustomId('connect music')
        .setStyle(ButtonStyle.Primary)
        .setLabel('연결'),
    );
  }

  private get embed(): EmbedBuilder {
    const embed = new EmbedBuilder()
      .setTitle('재생목록')
      .setDescription('현재 재생목록을 확인합니다.');
    if (!this.currunt)
      return embed;

    const fields = new Array();

    const copy = this.queue.slice();
    copy.unshift(this.currunt)
    for (const i in copy) {
      const { title, search, requestBy } = copy[i];
      const field = {
        name: `${parseInt(i) + 1}, ${search}`,
        value: `${title}, (신청자: ${requestBy})`,
        inline: false,
      };
      fields.push(field);
    }
    return embed.setFields(fields);
  }

  private getResource(data: Data): AudioResource {
    const audio = ytdl(`http://youtube.com/watch?v=${data.videoId}`, {
      quality: 'lowestaudio',
      filter: "audioonly"
    });

    return createAudioResource(audio);
  }
}

interface Data {
  title: string;
  search: string;
  videoId: string;
  requestBy: string;
}