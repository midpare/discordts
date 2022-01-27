import { joinVoiceChannel, DiscordGatewayAdapterCreator } from "@discordjs/voice";
import { Snowflake, VoiceBasedChannel } from "discord.js";

export class Music {
  public channelId: Snowflake | null = null

  public voiceChannel(channel: VoiceBasedChannel) {
    return joinVoiceChannel({
      guildId: channel.guild.id,
      channelId: channel.id,
      adapterCreator: channel.guild.voiceAdapterCreator as unknown as DiscordGatewayAdapterCreator,
      selfDeaf: false,
    })
  }
}

export const music = new Music(); 