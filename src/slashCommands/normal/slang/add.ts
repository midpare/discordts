import { ApplicationCommandOptionType } from 'discord.js';
import { Command } from '../../../managers/Commands';
import { SlashCommand } from '../../../managers/SlashCommand';
import { Utils } from '../../../structures/Utils';

export default new SlashCommand({
  name: '망언추가',
  category: '기본',
  usage: '망언추가 <유저> <망언>',
  description: '유저의 망언을 추가합니다.',
  options: [
    {
      name: '유저',
      description: '망언을 추가할 유저를 맨션합니다.',
      type: ApplicationCommandOptionType.User,
      required: true,
    },
    {
      name: '내용',
      description: '추가할 내용을 입력합니다.',
      type: ApplicationCommandOptionType.String,
      required: true,
    } 
  ],
  execute: async ({ interaction, options, client }) => {
    const target = options.getUser('유저', true)
    const content = options.getString('내용', true);
    
    const { guildId } = interaction;
    const { id } = target;


    const user = await client.models.config.findOne({ id, guildId });

    if (user.slangs.includes(content)) {
      Utils.reply(interaction, '이 망언은 이미 추가되어있습니다.');
      return;
    }
    
    (await client.models.config.updateOne({ id, guildId }, { $push: { slangs: content }})).matchedCount;
    Utils.reply(interaction, `성공적으로 망언을 추가했습니다!\n망언 내용: ${content}`);
  }  
})