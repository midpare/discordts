import { GuildMember, StageChannel, VoiceChannel } from 'discord.js';

export class CivilWar {
  public teams: Array<Array<GuildMember>> = [[], []];
  public channel!: StageChannel | VoiceChannel;

  public setTeam(members: Array<GuildMember>) {
    for (let i = 0; i < members.length; i += 2) {
      this.teams[0].push(members[i]);
      members[i + 1] ? this.teams[1].push(members[i + 1]) : null;
    }
  }

  public setChannel(channel: StageChannel | VoiceChannel) {
    this.channel = channel;
  }

  public clear() {
    this.teams = [[], []]
  }

  public isEmpty(): boolean {
    return this.teams[0].length < 1 && this.teams[1].length < 1;
  }

}