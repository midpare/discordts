import { MessageEmbed } from 'discord.js';
import { Command } from '../../../structures/Commands';
import { civilWar } from '../../../structures/game/CivilWar';
import { shuffle } from '../../../structures/Util';

export default new Command({
  name: '팀',
  aliases: ['팀나누기'],
  category: '내전',
  usage: '내전 팀 <이름> <이름> ...',
  description: '<이름>만큼의 유저를 1팀과 2팀으로 나눕니다.',
  execute: async ({ msg, args }) => {
    const members = shuffle(Array.from(msg.mentions.members?.values() || []));

    const team1 = new Array();
    const team2 = new Array();
    for (let i = 0; i < members.length; i += 2) {
      team1.push(members[i]);
      
      members[i + 1] ? team2.push(members[i + 1]) : null;
    }

    const embed = new MessageEmbed()
      .setTitle('팀')
      .addFields(
        { name: '1팀', value: `${team1.join(', ')}`, inline: false},
        { name: '2팀', value: `${team2.join(', ')}`, inline: false},
      );

    msg.channel.send({ embeds: [embed] });

    civilWar.team1 = team1;
    civilWar.team2 = team2;
  },
});