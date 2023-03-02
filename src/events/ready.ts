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

    const guild = client.guilds.cache.get('910521119713394738')!
    for (const id of users) {
      const user = guild.members.cache.get(id)?.user!;
      await user.createDM();
    }
  },
});