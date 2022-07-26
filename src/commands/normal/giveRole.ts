import { Command } from "../../managers/Commands";
import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js";

export default new Command({
  name: 'giverole',
  private: true,
  execute: ({ msg, client }) => {
    if (msg.author.id != '446068726849208341')
      return;

    const row: any = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId('giveRole')
        .setStyle(ButtonStyle.Primary)
        .setLabel('역할 받기'),
    );

    msg.channel.send({ content: '규칙을 확인하신 후, 아래 버튼을 눌러 역할을 부여받으세요', components: [row] });
    msg.delete();
  },
});