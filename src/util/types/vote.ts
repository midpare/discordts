import { Collection, Guild, Interaction, InteractionCollector, Snowflake } from "discord.js";

export interface vote {
  starter: Snowflake;
  guild: Guild;
  collector: InteractionCollector<Interaction>;
  title: string;
  names: Collection<string, VoteName>;
};

export interface VoteName {
  id: Array<Snowflake>;
  count: number;
}