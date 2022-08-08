import { ApplicationCommandOptionType, EmbedBuilder } from 'discord.js';
import { Command } from '../../../managers/Commands';
import { SlashCommand } from '../../../managers/SlashCommand';
import { Utils } from '../../../structures/Utils';

export default new SlashCommand({
  name: '망언확인',
  aliases: ['망언 목록', '망언 리스트'],
  category: '기본',
  usage: '망언확인 <유저>',
  description: '유저의 망언을 확인합니다.',
  options: [
    {
      name: '유저',
      description: '망언을 확인할 유저를 입력합니다.',
      type: ApplicationCommandOptionType.User,
      required: true,
    },
  ],
  execute: async ({ interaction, options, client }) => { 
    const target = options.getUser('유저', true);

    const { guildId } = interaction;
    const { id } = target;
    
    const user = await client.models.config.findOne({ id, guildId });

    if (user.slangs.length < 1) {
      Utils.reply(interaction, '이 유저는 망언을 보유하고 있지 않습니다.');
      return;
    }
    
    for (let i = 0; i < user.slangs.length; i++) {
      user.slangs[i] = `${i + 1}. ${user.slangs[i]}`;
    } 

    const embed = new EmbedBuilder()
      .setTitle(`${user.name}님의 망언`)
      .setDescription(`${user.slangs.join('\n')}`);

    interaction.reply({ embeds: [embed]});
   }  
})