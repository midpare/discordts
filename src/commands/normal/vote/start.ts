import { Collection, InteractionCollector, Message, MessageActionRow, MessageButton, MessageEmbed } from "discord.js";
import { client } from "../../../structures/Client";
import { Command } from "../../../structures/Commands";
import { ExtendInteraction } from "../../../util/types/interaction";

export default new Command({
  name: '투표 시작',
  category: '기본',
  usage: '투표 시작 <제목> <이름1>, <이름2>...',
  description: '<제목>의 투표를 시작합니다 이름들은 ","로 구분합니다.',
  execute: async ({ msg, args }) => {
    const id = msg.author.id;
    const title = args[0];
    const initialNames = args.slice(1).join(' ').split(',').map((element: string, index: number) => `${id},${element.trim()}`)
    const row = new MessageActionRow();
    const embed = new MessageEmbed();
    const names: Collection<string, number> = new Collection();

    if (client.vote.get(msg.author.id))
      return msg.reply('이미 시작한 투표가 있습니다.')

    if (!title)
      return msg.reply('투표 제목을 입력해주시기 바랍니다.');

    if (initialNames.length < 2)
      return msg.reply('두개 이상의 투표이름을 입력해주시기 바랍니다.\n이름은 ","로 구분합니다.');

    if (initialNames[initialNames.length - 1] == '')
      return msg.reply('투표 제목의 마지막은 ","이 될 수 없습니다')


    for (const name of initialNames) {
      names.set(name, 0);
      row.addComponents(
        new MessageButton()
          .setCustomId(name)
          .setLabel(name.split(',')[1])
          .setStyle('PRIMARY')
      );
      embed
        .addField(name.split(',')[1], '현재 투표 인원: 0명', true);
    }

    embed
      .setTitle(title)
      .setDescription(`${initialNames} 중 투표해주시기 바랍니다.`);

    const initialMessage = await msg.channel.send({ embeds: [embed], components: [row] })

    const collector = new InteractionCollector(client, {
      channel: msg.channel,
      componentType: 'BUTTON',
      guild: msg.guild,
      interactionType: 'MESSAGE_COMPONENT',
    });

    const vote = {
      guild: msg.guild,
      collector,
      title,
      names,
    };

    client.vote.set(id, vote);

    collector.on('collect', async (interaction: ExtendInteraction) => {
      const user = names.get(interaction.customId)
      if (typeof user == 'number') {
        names.set(interaction.customId, user + 1)
        for(const name of initialNames) {
          embed.setFields(
            {name: name.split(',')[1], value: `현재 투표 인원: 0`}
          )
        }
        initialMessage.edit({ content: interaction.customId })
      }
    });
  },
});