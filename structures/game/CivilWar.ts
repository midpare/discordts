import { GuildMember } from "discord.js";

export class CivilWar {
  public team1!: Array<GuildMember>
  public team2!: Array<GuildMember>
}

export const civilWar = new CivilWar()