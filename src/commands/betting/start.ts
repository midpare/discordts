import { Command } from '../../managers/Commands';
import { Betting } from '../../structures/games/Betting'
import { EmbedBuilder } from 'discord.js';

export default new Command({
  name: '베팅 시작',
  aliases: ['베팅 스타트'],
  category: '베팅',
  usage: '베팅 시작 <제목> <팀1> <팀2>',
  description: '베팅을 시작합니다.',
  execute: async ({ msg, args, client }) => {
    const id = msg.guildId ?? ''
    const prefix = process.env.PREFIX ?? ''
    if (client.betting.get(id))
      return msg.reply('이미 시작한 베팅이 있습니다.');

    if (!args[0])
      return msg.reply('제목을 입력해주시기바랍니다.');

    if (!args[1] || !args[2])
      return msg.reply('베팅 이름을 입력해주시기바랍니다.');

    const embed = new EmbedBuilder();
    const betting = new Betting(args[0], args[1], args[2], client);

    embed
      .setTitle(betting.title)
      .setDescription(`${betting.bet1.name}와 ${betting.bet2.name}중 베팅해주시기바랍니다.`)
      .addFields(
        { name: `${betting.bet1.name}`, value: `${prefix}베팅 ${betting.bet1.name} 로 베팅해주시기바랍니다.`, inline: true },
        { name: `${betting.bet2.name}`, value: `${prefix}베팅 ${betting.bet2.name} 로 베팅해주시기바랍니다.`, inline: true },
      );
    msg.channel.send({ embeds: [embed] });
    client.betting.set(id, betting);
  },
})