import { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, TextChannel, REST, Routes } from 'discord.js';
import { Event } from '../managers/Event';
import { Client } from '../structures/Client';

export default new Event({
  name: 'ready',
  execute: async (client: Client) => {
    console.log(`Successfully logged in to ${client.guilds.cache.size} servers!`);

    const users = [
      '699942311215366174', '659008807963328514', '915562060631400468',
      '766274189346209823', '446068726849208341', '849997691832500244',
      '607788765624270859', '783889899359043594', '716196838973243433', 
      '917682046095216690'
    ];

    const row = new ActionRowBuilder<ButtonBuilder>()
    for (let i = 0; i < 5; i++) {
      row.addComponents(
        new ButtonBuilder()
          .setCustomId(`vote ${i}`)
          .setStyle(ButtonStyle.Primary)
          .setLabel(`${i + 1}점`),
      );
    }
    const guild = client.guilds.cache.get('910521119713394738')!
    for (const id of users) {
      const user = guild.members.cache.get(id)?.user!;
      const channel = await user.createDM();
      
      channel.send({ content: '놀이터 서버의 ㄱㅈ#1971님의 강퇴에 대한 투표를 시행합니다.\n원하는 점수를 선택해주세요.\n1점이 강퇴 반대, 5점이 강퇴 찬성입니다.\n재투표를 원하시는 경우 다른 점수를 선택해주세요.\n모든 투표는 익명으로 진행됩니다.', components: [row] });
    }
  },
});