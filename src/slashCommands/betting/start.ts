import { Betting } from '../../structures/games/Betting'
import { ApplicationCommandOptionType, EmbedBuilder } from 'discord.js';
import { SlashCommand } from '../../managers/SlashCommand';
import { Utils } from '../../structures/Utils';

export default new SlashCommand({
  name: '베팅시작',
  aliases: ['베팅스타트'],
  category: '베팅',
  usage: '베팅시작 <제목> <팀1> <팀2>',
  description: '베팅을 시작합니다.',
  options: [
    {
      name: '제목',
      description: '베팅의 제목을 입력합니다.',
      type: ApplicationCommandOptionType.String,
      required: true,
    },
    {
      name: '팀1',
      description: '첫번째 팀의 이름을 입력합니다.',
      type: ApplicationCommandOptionType.String,
      required: true
    },
    {
      name: '팀2',
      description: '두번째 팀의 이름을 입력합니다.',
      type: ApplicationCommandOptionType.String,
      required: true,
    },
  ],
  execute: async ({ interaction, options, client }) => {
    const starter = interaction.user.id;
    const guildId = interaction.guildId ?? '';

    if (client.betting.get(guildId)) {
      Utils.reply(interaction, '이미 시작한 베팅이 있습니다.');
      return;
    }

    const title = options.getString('제목', true);
    const team1 = options.getString('팀1', true);
    const team2 = options.getString('팀2', true);


    const embed = new EmbedBuilder();
    const betting = new Betting(starter, title, team1, team2, client);

    embed
      .setTitle(betting.title)
      .setDescription(`${betting.bet1.name}와 ${betting.bet2.name}중 베팅해주시기바랍니다.`)
      .addFields(
        { name: `${betting.bet1.name}`, value: `/베팅 ${betting.bet1.name} 로 베팅해주시기바랍니다.`, inline: true },
        { name: `${betting.bet2.name}`, value: `/베팅 ${betting.bet2.name} 로 베팅해주시기바랍니다.`, inline: true },
      );
    interaction.channel?.send({ embeds: [embed] });
    client.betting.set(guildId, betting);
  },
})