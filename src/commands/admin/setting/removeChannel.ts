import { ApplicationCommandOptionType, PermissionFlagsBits } from 'discord.js';
import { Utils } from '../../../structures/Utils';
import { Command } from '../../../managers/Command';

export default new Command({
  name: '채널삭제',
  category: '관리자',
  usage: '채널삭제 <채널유형>',
  description: '서버에서 사용되는 여러 채널을 삭제합니다.(채널 자체를 삭제하는 것이 아닌 채널 유형만을 삭제합니다.)',
  options: [
    {
      name: '채널유형',
      description: '등록할 채널의 유형을 입력합니다.',
      type: ApplicationCommandOptionType.String,
      required: true,
      choices: [
        {
          name: '처벌내역',
          value: 'punishment',
        },
        {
          name: '도박',
          value: 'gambling',
        },
        {
          name: '명령어',
          value: 'command',
        },
        {
          name: '망언',
          value: 'slang',
        },
        {
          name: '노래',
          value: 'music'
        },
        {
          name: '알람',
          value: 'alarm',
        },
        {
          name: '내전',
          value: 'civilWar',
        },
        {
          name: '입장로그',
          value: 'log join',
        },
        {
          name: '채팅로그',
          value: 'log message',
        },
        {
          name: '명령어로그',
          value: 'log command',
        },
        {
          name: '음성로그',
          value: 'log voice',
        },
      ],
    },
  ],
  default_member_permissions: PermissionFlagsBits.Administrator,
  execute: async ({ interaction, options, client }) => {
    const { guildId: id } = interaction;
    const type = options.getString('채널유형', true);
    if (type.split(' ')[0] == 'log') {
      await client.models.guild.updateOne({ id }, { $set: { [`log.${type.split(' ')[1]}`]: '0' } }, { upsert: true })
    } else {
      (await client.models.guild.updateOne({ id }, { $set: { [type]: '0' } })).matchedCount;
    }

    Utils.reply(interaction, '성공적으로 채널을 삭제했습니다!');
    return 1;
  },
});