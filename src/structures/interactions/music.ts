import { AudioPlayer, AudioPlayerStatus, AudioResource, VoiceConnection } from "@discordjs/voice";
import { Guild } from "discord.js";

export class Music {
  private queue: Array<AudioResource>
  private player: AudioPlayer;
  private connection: VoiceConnection;

  constructor(connection: VoiceConnection, player: AudioPlayer, guild: Guild) {
    this.queue = new Array();
    this.player = player;
    this.connection = connection;

    this.player.on(AudioPlayerStatus.Idle, () => {
      const resource = this.nextResource;
      if (!resource) {
        this.connection.destroy();
      } else {
        this.player.play(resource);
      }
    });
  }

  public pushResource(resource: AudioResource) {
    this.queue.push(resource);
  }

  private get nextResource(): AudioResource | null {
    return this.queue.shift() ?? null;
  }
}