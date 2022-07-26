import { Command } from "../../managers/Commands";
import { Utils } from "../../structures/Utils";

export default new Command({
  name: 'giveRole',
  private: true,
  execute: ({ msg, client }) => {
    // if (msg.author.id != '446068726849208341')
    //   return;

    // const customId = Utils.uuid(1);
    // const row = new MessageActionRow().addComponents(
    //   new MessageButton()
    //     .setLabel('역할 받기')
    //     .setCustomId(customId)
    // )
  }
})