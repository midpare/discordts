import { Collection, Guild, Interaction, InteractionCollector } from "discord.js";

export interface vote {
  guild: Guild;
  collector: InteractionCollector<Interaction>;
  title: string;
  names: Collection<string, number>;
}