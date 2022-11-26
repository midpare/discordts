import { ApplicationCommandOptionType, GuildMember } from 'discord.js';
import { Command } from '../../managers/Command';

export default new Command({
  name: '채팅차단',
  category: '관리자',
  usage: '채팅차단 <유저> <시간>',
  description: '<유저>의 채팅을 <시간>만큼 차단합니다.',
  options: [
    {
      name: '유저',
      description: '차단할 유저를 입력합니다.',
      type: ApplicationCommandOptionType.User,
      required: true,
    },
    {
      name: '시간',
      description: '차단할 시간을 입력합니다.',
      type: ApplicationCommandOptionType.String,
      required: false,
    },
  ],
  execute: async ({ interaction, options, client }) => {
    const { guildId, member } = interaction;

    if (!(member instanceof GuildMember)) 
      return 0;

    // member.roles.add()
    interaction.reply({ content: '개발 중에 있습니다.', ephemeral: true });
    
    return 0;
  },
});