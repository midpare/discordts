import { ApplicationCommandOptionType, PermissionFlagsBits } from 'discord.js';
import { Command } from '../../../managers/Command';
import { Utils } from '../../../structures/Utils';

export default new Command({
  name: '역할등록',
  category: '관리자',
  usage: '역할등록 <역할유형> <역할>',
  description: '서버에서 사용되는 여러 역할을 등록합니다.',
  options: [
    {
      name: '역할유형',
      description: '등록할 역할의 유형을 입력합니다.',
      type: ApplicationCommandOptionType.String,
      required: true,
      choices: [
        {
          name: '기본역할',
          value: 'baseRole',
        },
      ],
    },
    {
      name: '역할',
      description: '역할을 입력합니다.',
      type: ApplicationCommandOptionType.Role,
      required: true,
    },
  ],
  default_member_permissions: PermissionFlagsBits.Administrator,
  execute: async ({ interaction, options, client }) => {
    const { guildId: id } = interaction
    const type = options.getString('역할유형', true);
    const role = options.getRole('역할', true);

    (await client.models.guild.updateOne({ id }, { $set: { [type]: role } })).matchedCount
  
    Utils.reply(interaction, '성공적으로 역할을 등록했습니다!');
    return 1;
  },
});