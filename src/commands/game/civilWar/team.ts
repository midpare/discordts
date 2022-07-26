import { EmbedBuilder } from 'discord.js';
import { Command } from '../../../managers/Commands';
import { Utils } from '../../../structures/Utils';

export default new Command({
  name: '내전 팀',
  aliases: ['내전 팀나누기'],
  category: '게임',
  usage: '내전 팀 <이름> <이름> ...',
  description: '<이름>만큼의 유저를 1팀과 2팀으로 나눕니다.',
  execute: async ({ msg, client }) => {
    const members = Utils.shuffle(Array.from(msg.mentions.members?.values() || []));
    
    const team1 = new Array();
    const team2 = new Array();
    for (let i = 0; i < members.length; i += 2) {
      team1.push(members[i]);
      
      members[i + 1] ? team2.push(members[i + 1]) : null;
    }
    
    if (!team2[0])
      return msg.reply('두명 이상 맨션을 해주시기 바랍니다.');

    const embed = new EmbedBuilder()
      .setTitle('팀')
      .addFields(
        { name: '1팀', value: `${team1.join(', ')}`, inline: false},
        { name: '2팀', value: `${team2.join(', ')}`, inline: false},
      );

    msg.channel.send({ embeds: [embed] });
    
    client.civilWar.allTeam = members;
    client.civilWar.team1 = team1;
    client.civilWar.team2 = team2;
  },
});