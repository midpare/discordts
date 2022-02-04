import { ButtonInteraction, Collection, Interaction, InteractionCollector, Message, MessageActionRow, MessageButton, MessageEmbed } from "discord.js";
import { client } from "../../../structures/Client";
import { Command } from "../../../structures/Commands";
import { VoteName } from "../../../util/types/vote";

export default new Command({
  name: '투표 시작',
  category: '기본',
  usage: '투표 시작 <제목> <이름1>, <이름2>...',
  description: '<제목>의 투표를 시작합니다 이름들은 ","로 구분합니다.',
  execute: async ({ msg, args }) => {
    const id = msg.author.id;
    const title = args[0];
    const initialNames = args.slice(1).join(' ').split(',').map(element => element.trim())
    const row = new MessageActionRow()
    const embed = new MessageEmbed();
    const names: Collection<string, VoteName> = new Collection();

    if (client.vote.get(msg.channelId))
      return msg.reply('이미 이 채널에 시작한 투표가 있습니다.')

    if (!title)
      return msg.reply('투표 제목을 입력해주시기 바랍니다.');

    if (initialNames.length < 2)
      return msg.reply('두개 이상의 투표이름을 입력해주시기 바랍니다.\n이름은 ","로 구분합니다.');

    if (initialNames[initialNames.length - 1] == '')
      return msg.reply('투표 제목의 마지막은 ","이 될 수 없습니다')


    for (const name of initialNames) {
      names.set(name, { id: [], count: 0 });
      row.addComponents(
        new MessageButton()
          .setCustomId(id + ',' + name)
          .setLabel(name)
          .setStyle('PRIMARY')
      );
      embed
        .addField(name, '현재 투표 인원: 0명', true);
    }
    row.addComponents(
      new MessageButton()
        .setCustomId(id + ',' + 'cancel')
        .setLabel('투표 취소')
        .setStyle('PRIMARY')
    );
    embed
      .setTitle(title)
      .setDescription(`${initialNames.join(', ')} 중 투표해주시기 바랍니다.`);

    const initialMessage = await msg.channel.send({ embeds: [embed], components: [row] })

    const collector = new InteractionCollector(client, {
      channel: msg.channel,
      componentType: 'BUTTON',
      guild: msg.guild,
      interactionType: 'MESSAGE_COMPONENT',
    });

    const vote = {
      starter: id,
      guild: msg.guild,
      collector,
      title,
      names,
    };

    client.vote.set(msg.channelId, vote);

    collector.on('collect', async (interaction: ButtonInteraction) => {
      const interactionId = interaction.user.id;
      const vote = client.vote.get(interaction.channelId);

      const voteName = interaction.customId.split(',')[1];
      const voteNode = vote?.names.get(voteName);

      if (!vote || !voteNode)
        return;

      if (voteNode.id.includes(interactionId))
        return interaction.reply({ content: '이미 이 선택지에 투표했습니다.', ephemeral: true })

      const embed = new MessageEmbed()
        .setTitle(title)
        .setDescription(`${initialNames.join(', ')} 중 투표해주시기 바랍니다.`);

      for (const [name, node] of vote.names) {
        if (node.id.includes(interactionId)) {
          node.count -= 1
          node.id.splice(node.id.indexOf(interactionId), 1)
        }
        if (name == voteName) {
          embed.addField(name, `현재 투표 인원: ${node.count + 1}명`, true);
          voteNode.count += 1;
          voteNode.id.push(interactionId);
          continue;
        }

        embed.addField(name, `현재 투표 인원: ${node.count}명`, true);
      }
      initialMessage.edit({ embeds: [embed] });
      interaction.reply({ content: `성공적으로 ${voteName}에 투표했습니다!`, ephemeral: true });
    });

    collector.on('end', () => {
      
    })
  },
});