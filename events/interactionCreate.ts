import { ExtendInteraction } from "../typings/interaction";
import { client } from "../clients/client";

export = {
  name: 'interactionCreate',
  event: (interaction: ExtendInteraction) => {
    const cmd = interaction.customId
    const events = client.interactions.get(cmd)
    if (!events) return
  
    events.execute(interaction)
  }
}