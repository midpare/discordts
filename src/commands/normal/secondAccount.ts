import { ApplicationCommandOptionType } from 'discord.js';
import { Command } from '../../managers/Command';
import { Utils } from '../../structures/Utils';

export default new Command({
  name: '부계정',
  category: '기본',
  usage: '부계정 <유저>',
  description: '자신의 부계정을 등록합니다',
  // options: [
  //   {
  //     name: '부계정',
  //     description: '부계정을 맨션합니다.',
  //     type: ApplicationCommandOptionType.User,
  //   }
  // ],
  execute: async ({ interaction, options, client }) => {
    Utils.reply(interaction, '현재 개발중에 있습니다.');
  },
});