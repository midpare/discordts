import { ApplicationCommandOptionType } from 'discord.js';
import { Command } from '../../../managers/Command';
import { Utils } from '../../../structures/Utils';

export default new Command({
  name: '망언삭제',
  category: '기본',
  usage: '망언삭제 <유저> <망언>',
  description: '유저의 망언을 삭제합니다.',
  options: [
    {
      name: '유저',
      description: '망언을 삭제할 유저를 입력합니다.',
      type: ApplicationCommandOptionType.User,
      required: true,
    },
    {
      name: '내용',
      description: '삭제할 망언의 내용을 입력합니다.',
      type: ApplicationCommandOptionType.String,
      required: true
    },
  ],
  execute: async ({ interaction, options, client }) => {
    const target = options.getUser('유저', true);
    const content = options.getString('내용');
    
    const { guildId } = interaction
    const { id } = target;

    const user = await client.models.config.findOne({ id, guildId });

    if (!user.slangs.includes(content)) {
      Utils.reply(interaction, '이 유저는 이 망언을 보유하고 있지 않습니다.');
      return;
    } 
    
    (await client.models.config.updateOne({ id, guildId }, { $pull: { slangs: content }})).matchedCount;
    Utils.reply(interaction, `성공적으로 망언을 삭제했습니다!\n망언 내용: ${content}`);
  }  
})