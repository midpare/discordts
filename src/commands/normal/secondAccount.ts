import { ApplicationCommandOptionType } from 'discord.js';
import { Command } from '../../managers/Command';
import { Utils } from '../../structures/Utils';

export default new Command({
  name: '부계정',
  category: '기본',
  usage: '부계정 <유저>',
  description: '자신의 부계정을 등록합니다',
  options: [
    {
      name: '유저',
      description: '부계정을 입력합니다.',
      type: ApplicationCommandOptionType.User,
    }
  ],
  execute: async ({ interaction, options, client }) => {
    const { guildId, user: { id } } = interaction;
    
    const target = options.getUser('유저')
    const targetConfig = client.models.config.findOne({ id, guildId });
    
    return 1;
  },
});